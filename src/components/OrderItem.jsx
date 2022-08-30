import React, { useContext, useEffect, useState } from 'react';
import { product } from '../constants/product';
import { ContextProvider } from '../helpers/context';
import instance from '../services/axiosConfig';
import { taxAmount, totalItemPrice, serviceChargeAmount } from '../constants/orderFormula';

const OrderItem = () => {
  // const [orderItems, setOrderItems] = useState([]);
  const { items, listOrders, setListOrders,setting, setSetting, totalOrderAmount, setTotalAmount, setActiveItem } = useContext(ContextProvider);
  let [indexItem, setIndexItem] = useState(1);

  const getSetting = async () =>{
    await instance.get('/setting')
    .then((result) => {
      setSetting(result.data.data[0])
      // console.log(setting)
      // console.log(setting)
    }).catch((err) => {
      console.log(err)
    });
  };

  const oderItemsHandler = (item, index ) => {
    setIndexItem(indexItem+=1);
    setListOrders(prev => [...prev, 
      {
        id: item.id,
        index:indexItem,
        itemName : item.name,
        itemPrice : item.price1,
        isActive: false,
        qty : 1,
        totalItemPrice: item.price1,
        tax: item.tax,
        taxAmount : item.tax ? taxAmount(setting.taxRate, item.price1) : 0,
        serviceCharge: item.serviceCharge,
        serviceChargeAmount:  item.serviceCharge ? serviceChargeAmount(setting.serviceChargeRate, item.price1) : 0
      }
    ]);
    setActiveItem(null)
    // console.log(setting.serviceChargeRate)
    // console.log(item.price1)

    
    // console.log(totalAmount)
  };


  

  useEffect(() => {
    // getItems();
    getSetting();
  }, [items, listOrders])

  return (
    <div className='w-10/12 overflow-hidden'>
      <div className='grid grid-cols-5 gap-2 mr-4 text-sm font-medium justify-center items-center'>
        {items.length >= 1 ? items.map((item,index) => (
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
