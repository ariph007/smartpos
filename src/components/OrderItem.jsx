import React, { useContext, useEffect, useState } from 'react';
import { product } from '../constants/product';
import { ContextProvider } from '../helpers/context';
import instance from '../services/axiosConfig';
import { totalPay, totalAfterRounding, totalBeforeRounding, taxAmount, serviceChargeAmount } from '../constants/orderFormula';


const OrderItem = () => {
  // const [orderItems, setOrderItems] = useState([]);
  let {
    items,
    listOrders,
    setListOrders,
    setting,
    selectedDisc,
    setSelectedDisc,
    setSetting, indexItem,
    setIndexItem,
    setActiveItem,
    orderInfo,
    setOrderInfo
  } = useContext(ContextProvider);

  const getSetting = async () => {
    await instance.get('/setting')
      .then((result) => {
        setSetting(result.data.data[0])
      }).catch((err) => {
        console.log(err)
      });
  };

  const oderItemsHandler = (item, index) => {
    setIndexItem(indexItem += 1);
    //Check if have discount before, if no discount set discount to false
    if (selectedDisc.length === 0) {
      setListOrders(prev => [...prev,
      {
        id: item.id,
        categoryId: item.category_id,
        departmentId: item.category.department_id,
        index: indexItem,
        itemName: item.name,
        itemPrice: item.price1,
        isActive: false,
        qty: 1,
        totalItemPrice: item.price1,
        tax: item.tax,
        taxAmount: item.tax ? taxAmount(setting.taxRate, item.price1) : 0,
        serviceCharge: item.serviceCharge,
        serviceChargeAmount: item.serviceCharge ? serviceChargeAmount(setting.serviceChargeRate, item.price1) : 0,
        discount: false,
        discountAmunt: 0,
        discName: '',
        discId: null
      }
      ]);
      //check if have discount amount before, if its have -> set discount 
    } else if (selectedDisc.amount) {
      console.log('udah ada diskon')
      // console.log(selectedDisc.subtotal)
      setListOrders(prev => [...prev,
      {
        id: item.id,
        categoryId: item.category_id,
        departmentId: item.category.department_id,
        index: indexItem,
        itemName: item.name,
        itemPrice: item.price1,
        isActive: false,
        qty: 1,
        totalItemPrice: item.price1,
        tax: item.tax,
        taxAmount: item.tax ? taxAmount(setting.taxRate, item.price1) : 0,
        serviceCharge: item.serviceCharge,
        serviceChargeAmount: item.serviceCharge ? serviceChargeAmount(setting.serviceChargeRate, item.price1) : 0,
        discount: true,
        discountAmunt: !selectedDisc.subtotal ? selectedDisc.value : Math.round(selectedDisc.value / (listOrders.length + 1)),
        discName: selectedDisc.name,
        discId: selectedDisc.id
      }
      ]);

      // let newObjectOrder = [...listOrders];
      // for (const order of listOrders) {
      //   order.discount = true;
      //   order.discName = selectedDisc.name;
      //   order.discId = selectedDisc.id;
      //   order.discountAmunt = selectedDisc.value / listOrders.length
      //   newObjectOrder.push(order)
      //   setListOrders(newObjectOrder);
      // }
    } else if (!selectedDisc.amount &&
      (item.category_id === selectedDisc.category1_id ||
        item.category_id === selectedDisc.category2_id ||
        item.category_id === selectedDisc.category3_id ||
        item.category.department_id === selectedDisc.department1_id ||
        item.category.department_id === selectedDisc.department2_id ||
        item.category.department_id === selectedDisc.department3_id ||
        item.id === selectedDisc.item1 ||
        item.id === selectedDisc.item2 ||
        item.id === selectedDisc.item3)) {
      // console.log('persen diskon')
      setListOrders(prev => [...prev,
      {
        id: item.id,
        categoryId: item.category_id,
        departmentId: item.category.department_id,
        index: indexItem,
        itemName: item.name,
        itemPrice: item.price1,
        isActive: false,
        qty: 1,
        totalItemPrice: item.price1,
        tax: item.tax,
        taxAmount: item.tax ? taxAmount(setting.taxRate, item.price1) : 0,
        serviceCharge: item.serviceCharge,
        serviceChargeAmount: item.serviceCharge ? serviceChargeAmount(setting.serviceChargeRate, item.price1) : 0,
        discount: true,
        discountAmunt: selectedDisc.value / 100 * item.price1,
        discName: selectedDisc.name,
        discId: selectedDisc.id
      }
      ]);
      console.log('kena')

    } else if (!selectedDisc.amount &&
      (item.category_id !== selectedDisc.category1_id ||
        item.category_id !== selectedDisc.category2_id ||
        item.category_id !== selectedDisc.category3_id ||
        item.category.department_id !== selectedDisc.department1_id ||
        item.category.department_id !== selectedDisc.department2_id ||
        item.category.department_id !== selectedDisc.department3_id ||
        item.id !== selectedDisc.item1 ||
        item.id !== selectedDisc.item2 ||
        item.id !== selectedDisc.item3)) {
      // console.log('persen diskon')
      setListOrders(prev => [...prev,
      {
        id: item.id,
        categoryId: item.category_id,
        departmentId: item.category.department_id,
        index: indexItem,
        itemName: item.name,
        itemPrice: item.price1,
        isActive: false,
        qty: 1,
        totalItemPrice: item.price1,
        tax: item.tax,
        taxAmount: item.tax ? taxAmount(setting.taxRate, item.price1) : 0,
        serviceCharge: item.serviceCharge,
        serviceChargeAmount: item.serviceCharge ? serviceChargeAmount(setting.serviceChargeRate, item.price1) : 0,
        discount: false,
        discountAmunt: 0,
        discName: '',
        discId: null
      }
      ]);
    }
    setActiveItem(null);

  };

  const orderInfoHandler = () => {
    const subTotalItem = listOrders?.length &&
      listOrders.reduce(function (acc, obj) {
        return acc + obj.totalItemPrice
      }, 0);

    const totalQty = listOrders?.length &&
      listOrders.reduce(function (acc, obj) {
        return acc + obj.qty
      }, 0);
    const totalTax = listOrders?.length &&
      listOrders.reduce(function (acc, obj) {
        return acc + obj.taxAmount
      }, 0);

    const totalServiceCharge = listOrders?.length &&
      listOrders.reduce(function (acc, obj) {
        return acc + obj.serviceChargeAmount
      }, 0);

      let totalDisc = 0;
      for (const order of listOrders) {
        if (order.discount) {
          totalDisc = totalDisc + order.discountAmunt;
        }
      }

    const totalAmountRounding = totalAfterRounding(totalTax, totalServiceCharge, subTotalItem, setting.rounding) - (totalBeforeRounding(totalTax, totalServiceCharge, subTotalItem))
    const totalMustPaid = totalAfterRounding(totalTax, totalServiceCharge, subTotalItem, setting.rounding, orderInfo.totalDisc);


    setOrderInfo(
      {
        ...orderInfo,
        totalTax: totalTax,
        totalServiceCharge: totalServiceCharge,
        totalAmountRounding: totalAmountRounding,
        subTotalItem: subTotalItem,
        totalMustPaid: totalMustPaid,
        totalQty: totalQty,
        totalDisc: totalDisc,
        totalItem: listOrders.length
      })
  }

  const discUpdate = () =>{
    let totalDisc = 0;
    for (const order of listOrders) {
      if (order.discount) {
        totalDisc = totalDisc + order.discountAmunt;
      }
    }
    setOrderInfo({
      ...orderInfo,
      totalDisc: totalDisc,
    })
  }

  useEffect(() => {
    // getItems();
    console.log(selectedDisc);
    console.log(listOrders);
    getSetting();
    orderInfoHandler();
    // console.log(orderInfo.totalMustPaid)
  }, [items, listOrders])

  return (
    <div className='w-10/12 overflow-hidden'>
      <div className='grid grid-cols-5 gap-2 mr-4 text-sm font-medium justify-center items-center'>
        {items.length >= 1 ? items.map((item, index) => (
          <div
            onClick={() => oderItemsHandler(item, indexItem)}
            key={index}
            className='bg-secondary hover:bg-neutral-600 px-2 cursor-pointer flex justify-center h-[60px] rounded-md text-center items-center'>
            <p className='text-xs'>{item.name}</p>
          </div>
        )) :
          <div className='flex w-[50vw] h-[80vh] justify-center items-center'>
            <p className='text-lg font-semibold'>Please choose category</p>
          </div>
        }
      </div>
    </div>
  )
}

export default OrderItem
