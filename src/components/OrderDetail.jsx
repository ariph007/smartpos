import React, { useContext, useEffect, useRef, useState } from 'react';
import { Items } from '../constants/items';
import { thousandSeperator } from '../constants/thousandSeperator';
import { totalPay, totalAfterRounding, totalBeforeRounding } from '../constants/orderFormula';
import { FiTrash2 } from 'react-icons/fi';
import { ContextProvider } from '../helpers/context';
import instance from '../services/axiosConfig';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OrderDetail = () => {
    const { listOrders, setListOrders, activeItem, setActiveItem, setting, setSetting } = useContext(ContextProvider);
    // console.log(setting)
    const searchInputRef = useRef(null);

    const doubleItemClick = () => {
        setActiveItem(null);
    };

    const itemDetailHandler = (item) => {
        setActiveItem(item.index);
        console.log(activeItem)
    };

    const voidItemHandler = (item) => {
        // console.log(item)
        // console.log(i)
        // console.log(listOrders)
        setListOrders(current =>
            current.filter(order => {
                return order.index !== item.index
            })
        );
    };
    const getSetting = async () => {
        await instance.get('/setting')
            .then((result) => {
                setSetting(result.data.data[0])
                // console.log(setting)
                // console.log(setting)
            }).catch((err) => {
                console.log(err)
            });
    };
    const subTotalItem = listOrders?.length &&
    listOrders.reduce(function (acc, obj) {
        return acc + obj.totalItemPrice
        }, 0);

    const totalQty = listOrders?.length &&
        listOrders.reduce(function (acc, obj) {
            return acc + obj.qty
        }, 0);
    
    // const subTotalPay = subTotalItem;

    const totalTax = listOrders?.length &&
        listOrders.reduce(function (acc, obj) {
            return acc + obj.taxAmount
        }, 0);

    const totalServiceCharge = listOrders?.length &&
        listOrders.reduce(function (acc, obj) {
            return acc + obj.serviceChargeAmount
        }, 0);


    const totalAmountRounding = totalAfterRounding(totalTax, totalServiceCharge, subTotalItem, setting.rounding) - (totalBeforeRounding(totalTax, totalServiceCharge, subTotalItem))
    const totalMustPaid = totalAfterRounding(totalTax, totalServiceCharge, subTotalItem, setting.rounding);

    // const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        searchInputRef.current.focus();
        getSetting();
        // console.log(subTotalItem)
        // console.log(totalTax)
        // console.log(totalServiceCharge)
        // console.log(setting)
        AOS.init({
            duration: 300
        });
    }, [activeItem, listOrders]);

    return (
        <div className='w-3/12 overflow-hidden'>
            <input
                ref={searchInputRef}
                type="text"
                className='focus:outline-1 w-full rounded-sm bg-secondary/90 h-8 indent-2 focus-within:shadow-md focus' />
            <div className='mt-4 flex flex-col max-h-screen relative'>
                <div className='max-h-[55vh] min-h-[55vh] overflow-y-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {listOrders.length > 0 ? listOrders?.map((item, i) => (
                        <div key={i} data-aos="fade-up" onClick={() => itemDetailHandler(item)} onDoubleClick={() => doubleItemClick()}
                            className={activeItem === item.index ?
                                "flex cursor-pointer text-xs w-full mb-4 bg-neutral-600 hover:bg-secondary/60 h-10 items-center gap-4 rounded-md" :
                                'flex cursor-pointer text-xs w-full mb-4 bg-secondary hover:bg-neutral-600 h-10 items-center gap-4 rounded-md'}>
                            {
                                activeItem === item.index ?
                                    <div onClick={() => voidItemHandler(item, i)} className='bg-secondary hover:bg-slate-700 h-full px-3 rounded-md flex justify-center items-center'>
                                        <FiTrash2 color='#df4759' size={20} />
                                    </div>
                                    :
                                    <p data-aos="fade-left" className='bg-white z-40 px-1 text-secondary rounded-full ml-2'>{i + 1}</p>
                            }
                            <p className='w-9/12'>{item.itemName}</p><span>{item.qty}</span>
                            <p className='text-right w-2/12 mr-2'>{thousandSeperator(item.totalItemPrice)}</p>
                        </div>
                    )) :
                    <p className='text-center text-sm text-white/80'>There is no order</p>}
                </div>
                <div className='max-h-[32vh] min-h-[32vh] mb-2 w-full bg-secondary rounded-md px-2 text-xs z-40'>
                    <div className='border-b-2 border-dotted'>
                        <div className='flex w-full justify-between mb-2 pt-4'>
                            <p>TAX</p>
                            <p>{thousandSeperator(totalTax)}</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>SERVICE CHARGE</p>
                            <p>{thousandSeperator(totalServiceCharge)}</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>ROUNDING</p>
                            <p>{setting.hasOwnProperty('rounding') ? totalAmountRounding : 0}</p>
                        </div>
                        <div className='flex w-full justify-between mb-6'>
                            <p>SUBTOTAL</p>
                            <p>{thousandSeperator(subTotalItem)}</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>TOTAL ITEM <span>{listOrders.length}</span></p>
                            <p>TOTAL QTY <span>{totalQty}</span></p>
                        </div>
                    </div>
                    <div className='mt-4 pb-4'>
                        <div className='flex justify-between text-xl font-medium pb-4'>
                            <p>Total</p>
                            <p>{setting.hasOwnProperty('rounding') ? thousandSeperator(totalMustPaid) : 0}</p>
                        {/* <p>{totalAfterRounding}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
