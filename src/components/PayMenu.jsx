import React, { useContext, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import instance from '../services/axiosConfig';
import { ContextProvider } from '../helpers/context';
import { useNavigate } from 'react-router-dom';


const PayMenu = ({payMenu, setPayMenu}) => {
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState([]);
    const navigate = useNavigate();
    let {
        selectedDisc,
        setSelectedDisc,
        listOrders,
        setListOrders,
        orderInfo,
        setOrderInfo
    } = useContext(ContextProvider);

    const getPaymentMethod = async () => {
        await instance.get('/payment')
        .then((result) => {
            setPaymentMethod(result.data.data)
        }).catch((err) => {
            console.log(err)
        });
    };

    const btnPaymentHandler = (payment) => {
        setSelectedPayment(payment);
        // console.log(payment)
    };

    const savePaymentHandler = async () => {
        await instance.post('/sales',{
            customerName: orderInfo.table,
            discountAmount: orderInfo.totalDisc,
            serviceCharge: orderInfo.totalServiceCharge,
            rounding: orderInfo.totalAmountRounding,
            subtotal: orderInfo.subTotalItem,
            total: orderInfo.totalMustPaid,
            totalGuest: Number(orderInfo.totalGuest),
            totalItem: orderInfo.totalItem,
            totalQty: orderInfo.totalQty,
            tax: orderInfo.totalTax,
            employee_id: 1,
            paymentMethod_id: selectedPayment.id,
            item: listOrders
        })
        .then((result) => {
            // const sales = instance.get('/sales/unpaid')
            // console.log(sales)
            console.log(result);
            navigate('/dashboard')
            setListOrders([]);
            setOrderInfo({
                ...orderInfo,
                totalGuest: '2'
            });
        }).catch((err) => {
            console.log(err)
            
        });
        setSelectedPayment([]);
        setSelectedDisc([]);
    };

    const btnPaymentClose = () => {
        setPayMenu(!payMenu);
        setSelectedPayment([]);
        setSelectedDisc([]);
    }

    useEffect(()=>{
        getPaymentMethod();
    },[paymentMethod])
  return (
    <div>
            
            <div className='absolute w-[100%] h-[100%] z-50 top-0 left-0 bg-secondary/40'>
                <div className='flex flex-col justify-center m-auto items-center'>
                    <div className='mb-10'>
                        <p className='mt-12'>Please choose payment method on the list</p>
                    </div>
                    <div className='grid grid-cols-6 gap-5 max-w-[70vw]'>
                        {
                            paymentMethod && paymentMethod?.map((payment) => (
                                <button
                                    onClick={() => btnPaymentHandler(payment)}
                                    key={payment.id}
                                    className={
                                        selectedPayment.id === payment.id ?
                                            "py-4 text-center bg-slate-700 rounded-md font-semibold text-sm"
                                            :
                                            'py-4 text-center bg-primary rounded-md font-semibold text-sm'}>
                                    {payment.name}
                                </button>
                            ))
                        }
                    </div>
                    <div onClick={savePaymentHandler} className='absolute bottom-20'>
                        <button className='px-12 py-2 bg-success rounded-md font-semibold text-sm'>OK</button>
                    </div>
                    <div onClick={btnPaymentClose} className='absolute top-6 right-6 hover:cursor-pointer'>
                        <MdClose size={28} />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PayMenu
