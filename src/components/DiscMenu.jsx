import React, { useEffect, useState, useContext } from 'react'
import { totalAfterRounding, totalBeforeRounding } from '../constants/orderFormula';
import { ContextProvider } from '../helpers/context';
import instance from '../services/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdClose } from 'react-icons/md';
import { thousandSeperator } from '../constants/thousandSeperator';


const DiscMenu = ({ listDisc, discMenu, setDiscMenu }) => {
    let {
        listOrders,
        setListOrders,
        setting,
        selectedDisc,
        setSelectedDisc,
        orderInfo,
        setOrderInfo
    } = useContext(ContextProvider);

    const btnDiscClose = () => {
        setDiscMenu(!discMenu);
    };

    const btnDiscountHandler = (disc) => {
        //Check if discount amount is greater than total must paid, if it true then can't get discount
        if (listOrders.length > 0) {
            if (disc.amount && disc.value && disc.subtotal > orderInfo.totalMustPaid) {
                toast.error("Discount greater than total must paid", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                });
                // Check if it discount by amount and effect to subtotal and value 
                // not greater than total must paid, if true then can get discount
            } else if (disc.amount && disc.subtotal && disc.value < orderInfo.totalMustPaid) {
                console.log('naisss')

                let newObjectOrder = [];


                for (const order of listOrders) {
                    if (
                        order.categoryId === disc.category1_id ||
                        order.categoryId === disc.category2_id ||
                        order.categoryId === disc.category3_id ||
                        order.departmentId === disc.department1_id ||
                        order.departmentId === disc.department2_id ||
                        order.departmentId === disc.department3_id ||
                        order.id === disc.item1 ||
                        order.id === disc.item2 ||
                        order.id === disc.item3
                    ) {
                setSelectedDisc(disc);
                        order.discount = true;
                        order.discName = disc.name;
                        order.discId = disc.id;
                        order.discountAmunt = disc.value / listOrders.length
                        newObjectOrder.push(order)
                    }else{
                        newObjectOrder.push(order)
                    }
                    setListOrders(newObjectOrder);
                }

                const totalMustPaid = totalAfterRounding(
                    orderInfo.totalTax,
                    orderInfo.totalServiceCharge,
                    orderInfo.subTotalItem,
                    setting.rounding,
                    disc.value
                );
                setOrderInfo({
                    ...orderInfo,
                    totalDisc: disc.value,
                    totalMustPaid: totalMustPaid
                });
                //Controlling for discount by percent
            } else if (disc.amount && !disc.subtotal) {
                console.log('eee');
                setSelectedDisc(disc);
                let newObjectOrder = [];
                for (const order of listOrders) {
                    order.discount = true;
                    order.discName = disc.name;
                    order.discId = disc.id;
                    order.discountAmunt = disc.value
                    newObjectOrder.push(order)
                    setListOrders(newObjectOrder);
                };
                const totalMustPaid = totalAfterRounding(
                    orderInfo.totalTax,
                    orderInfo.totalServiceCharge,
                    orderInfo.subTotalItem,
                    setting.rounding,
                    disc.value
                );
                setOrderInfo({
                    ...orderInfo,
                    totalDisc: disc.value,
                    totalMustPaid: totalMustPaid
                });
            } else if (!disc.amount && disc.subtotal) {
                // console.log('subss')
                let newObjectOrder = [];
                for (const order of listOrders) {
                    if (
                        order.categoryId === disc.category1_id ||
                        order.categoryId === disc.category2_id ||
                        order.categoryId === disc.category3_id ||
                        order.departmentId === disc.department1_id ||
                        order.departmentId === disc.department2_id ||
                        order.departmentId === disc.department3_id ||
                        order.id === disc.item1 ||
                        order.id === disc.item2 ||
                        order.id === disc.item3
                    ) {
                        setSelectedDisc(disc);
                        order.discount = true;
                        order.discName = disc.name;
                        order.discId = disc.id;
                        order.discountAmunt = disc.value / 100 * order.totalItemPrice
                        newObjectOrder.push(order)
                    } else if (!disc.category1_id && !disc.category2_id && !disc.category3_id
                        && !disc.department1_id && !disc.department2_id && !disc.department3_id
                        && !disc.item1 && !disc.item2 && !disc.item3) {
                        setSelectedDisc(disc);
                        console.log('kosong');

                        order.discount = true;
                        order.discName = disc.name;
                        order.discId = disc.id;
                        order.discountAmunt = disc.value / 100 * order.totalItemPrice
                        newObjectOrder.push(order)
                    } else {
                        newObjectOrder.push(order)
                    }
                    setListOrders(newObjectOrder);
                }

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
        } else {
            setSelectedDisc([]);
            toast.error("No item in order list", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500
            });
        };

    };

    const saveDiscHandler = () => {
        setDiscMenu(!discMenu);
    };


    useEffect(() => {
    }, [listDisc, orderInfo, selectedDisc])
    return (
        <div>
            <ToastContainer limit={1} />
            <div className='absolute w-[100%] h-[100%] z-50 top-0 left-0 bg-secondary/40'>
                <div className='flex flex-col justify-center m-auto items-center'>
                    <div className='mb-10'>
                        <p className='mt-12'>Please choose discount on the list</p>
                    </div>
                    <div className='grid grid-cols-6 gap-5 max-w-[70vw]'>
                        {
                            listDisc && listDisc.map((disc) => (
                                <button
                                    onClick={() => btnDiscountHandler(disc)}
                                    key={disc.id}
                                    className={
                                        selectedDisc.id === disc.id ?
                                            "py-4 text-center bg-slate-700 rounded-md font-semibold text-sm"
                                            :
                                            'py-4 text-center bg-primary rounded-md font-semibold text-sm'}>
                                    {disc.name}
                                </button>
                            ))
                        }
                    </div>
                    <div onClick={saveDiscHandler} className='absolute bottom-20'>
                        <button className='px-12 py-2 bg-success rounded-md font-semibold text-sm'>OK</button>
                    </div>
                    <div onClick={btnDiscClose} className='absolute top-6 right-6 hover:cursor-pointer'>
                        <MdClose size={28} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscMenu
