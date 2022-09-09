import React, { useContext, useEffect, useRef, useState } from 'react';
import { Items } from '../constants/items';
import { thousandSeperator } from '../constants/thousandSeperator';
import { totalPay, totalAfterRounding, totalBeforeRounding, taxAmount, serviceChargeAmount } from '../constants/orderFormula';
import { FiTrash2 } from 'react-icons/fi';
import { TbDiscount } from "react-icons/tb";
import { ContextProvider } from '../helpers/context';
import instance from '../services/axiosConfig';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from 'react-router-dom';


const OrderDetail = () => {
    let {
        listOrders,
        setListOrders,
        activeItem,
        setActiveItem,
        setting,
        setSetting,
        indexItem,
        setIndexItem,
        selectedDisc,
        orderInfo,
        setSelectedDisc,
        setOrderInfo
        // subtotalDisc
    } = useContext(ContextProvider);
    // console.log(setting)
    const searchInputRef = useRef(null);
    const [isActiveDiscount, setIsActiveDiscount] = useState(false);

    const btnDiscHandler = () => {
        setIsActiveDiscount(!isActiveDiscount)
    };

    const voidDiscHandler = () => {
        setSelectedDisc([]);

        let orderAfterVoidDisc = [];
        for (const order of listOrders) {
            order.discount = false;
            order.discName = '';
            order.discId = null;
            order.discountAmunt = 0;
            orderAfterVoidDisc.push(order)
        }
        setListOrders(orderAfterVoidDisc)
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

        const totalAmountRounding = totalAfterRounding(totalTax, totalServiceCharge, subTotalItem, setting.rounding) - (totalBeforeRounding(totalTax, totalServiceCharge, subTotalItem))
        const totalMustPaid = totalAfterRounding(totalTax, totalServiceCharge, subTotalItem, setting.rounding, 0);

        setOrderInfo({
            ...orderInfo,
            totalDisc: 0,
            totalTax: totalTax,
            totalServiceCharge: totalServiceCharge,
            totalAmountRounding: totalAmountRounding,
            subTotalItem: subTotalItem,
            totalMustPaid: totalMustPaid,
            totalQty: totalQty,
            totalItem: listOrders.length,
        })
    }

    const searchHandler = async (e) => {
        let input = document.getElementById('searchInput')
        if (e.key === 'Enter') {
            try {
                const getItem = await instance.get(`/item/${input.value}`)
                const item = getItem.data.data
                if (item) {
                    console.log(item)
                    setIndexItem(indexItem += 1);
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
                    setActiveItem(null);
                }
            } catch (error) {
                console.log(`${error.code}: ${error.message}`)
            };
            //Clear input text
            input.value = null
        };
    };

    const doubleItemClick = () => {
        setActiveItem(null);
    };

    const itemDetailHandler = (item) => {
        setActiveItem(item.index);
        console.log(activeItem)
    };

    const voidItemHandler = (item) => {
        setListOrders(current =>
            current.filter(order => {
                return order.index !== item.index
            })
        );

        if (listOrders.length === 1) {
            setSelectedDisc([]);
            setIsActiveDiscount(false);

            const totalMustPaid = totalAfterRounding(
                orderInfo.totalTax,
                orderInfo.totalServiceCharge,
                orderInfo.subTotalItem,
                setting.rounding,
                0
            );
            setOrderInfo({
                ...orderInfo,
                totalDisc: 0,
                totalMustPaid: totalMustPaid
            });

        }
        console.log(listOrders);

    };
    const getSetting = async () => {
        await instance.get('/setting')
            .then((result) => {
                setSetting(result.data.data[0])
            }).catch((err) => {
                console.log(err)
            });
    };

    const params = useParams();

    useEffect(() => {
        searchInputRef.current.focus();
        getSetting();
       
    }, [activeItem, listOrders, orderInfo, selectedDisc]);

    return (
        <div className='w-3/12 overflow-hidden'>
            <input
                autoComplete='off'
                id='searchInput'
                ref={searchInputRef}
                onKeyDown={searchHandler}
                type="text"
                className='focus:outline-1 w-full rounded-sm bg-secondary/90 h-8 indent-2 focus-within:shadow-md focus' />
            <div className='mt-4 flex flex-col max-h-[100vh] min-h-[100vh] relative'>
                <div className='max-h-[40vh] overflow-y-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {listOrders.length > 0 ? listOrders?.map((item, i) => (
                        <div key={i}   onClick={() => itemDetailHandler(item)} onDoubleClick={() => doubleItemClick()}
                            className={activeItem === item.index ?
                                "flex cursor-pointer text-xs w-full mb-4 bg-neutral-600 hover:bg-secondary/60 h-10 items-center gap-4 rounded-md" :
                                'flex cursor-pointer text-xs w-full mb-4 bg-secondary hover:bg-neutral-600 h-10 items-center gap-4 rounded-md'}>
                            {
                                activeItem === item.index ?
                                    <div onClick={() => voidItemHandler(item, i)} className='bg-secondary hover:bg-slate-700 h-full px-3 rounded-md flex justify-center items-center'>
                                        <FiTrash2 color='#df4759' size={20} />
                                    </div>
                                    :
                                    <p className='bg-white z-40 px-1 text-secondary rounded-full ml-2'>{i + 1}</p>
                            }
                            <p className='w-9/12'>{`${item.itemName}`}<span className='text-danger text-base'>{item.discount ? '*' : ''}</span> </p><span>{item.qty}</span>
                            <p className='text-right w-2/12 mr-2'>{thousandSeperator(item.totalItemPrice)}</p>
                        </div>
                    )) :
                        <p className='text-center text-sm text-white/80'>There is no order</p>
                    }
                    {
                        selectedDisc.value > 0 && selectedDisc.name.length > 1 && listOrders.length >= 1 &&
                        <div
                            onClick={btnDiscHandler}
                            className='flex justify-between px-2 cursor-pointer text-xs w-full mb-4 bg-success/80 hover:bg-success/60 h-10 items-center gap-4 rounded-md'>
                            {
                                isActiveDiscount ?
                                    <div
                                        onClick={() => voidDiscHandler()}
                                        className='bg-secondary hover:bg-slate-700 h-full px-3 rounded-md flex justify-center items-center'>
                                        <FiTrash2 color='#df4759' size={20} />
                                    </div>
                                    :
                                    <p className='text-center text-xs text-white/80'>{selectedDisc.subtotal ? 'DISC SUBTOTAL' : 'DISC SELECTED ITEM'}</p>

                            }
                            <div className="flex items-center">
                                <TbDiscount size={20} />
                                <p className='pl-2 text-center text-xs text-white/80'>{selectedDisc.name}</p>
                            </div>
                            <p className='text-center text-xs text-white/80'>{thousandSeperator(selectedDisc.value)}</p>
                        </div>
                    }
                </div>
                <div className='max-h-[40vh] min-h-[32vh] w-full bg-secondary rounded-md px-2 text-xs z-60 absolute bottom-24'>
                    <div className='border-b-2 border-dotted'>
                        <div className='flex w-full justify-between mb-2 pt-4'>
                            <p className='text-center text-base font-medium w-full'>TABLE {params.table}</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>TAX</p>
                            <p>{orderInfo.totalTax ? thousandSeperator(orderInfo.totalTax) : 0}</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>SERVICE CHARGE</p>
                            <p>{orderInfo.totalServiceCharge ? thousandSeperator(orderInfo.totalServiceCharge) : 0}</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>DISCOUNT</p>
                            <p>{orderInfo.totalDisc > 0 ? thousandSeperator(orderInfo.totalDisc) : 0}</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>ROUNDING</p>
                            <p>{setting.hasOwnProperty('rounding') && orderInfo.totalAmountRounding ? orderInfo.totalAmountRounding : 0}</p>
                        </div>
                        <div className='flex w-full justify-between mb-6'>
                            <p>SUBTOTAL</p>
                            <p>{orderInfo.subTotalItem ? thousandSeperator(orderInfo.subTotalItem) : 0}</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>TOTAL ITEM <span>{orderInfo.totalItem}</span></p>
                            <p>TOTAL QTY <span>{orderInfo?.totalQty}</span></p>
                        </div>
                    </div>
                    <div className='mt-4 pb-4'>
                        <div className='flex justify-between text-xl font-medium pb-4'>
                            <p>Total</p>
                            <p>{setting.hasOwnProperty('rounding') && listOrders.length > 0 ? thousandSeperator(orderInfo.totalMustPaid) : 0}</p>
                            {/* <p>{totalAfterRounding}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
