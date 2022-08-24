import React from 'react'
import OrderCategory from '../components/OrderCategory'
import OrderDetail from '../components/OrderDetail'
import OrderFooter from '../components/OrderFooter'
import OrderItem from '../components/OrderItem'
import OrderQty from '../components/OrderQty'

const Order = () => {
    return (
        <div className='flex flex-col w-[95%] 2xl:max-w-[1536px] mt-4 h-screen m-auto'>
            <div className='flex w-full h-[90%]'>
                <OrderDetail />
                <div className='w-9/12 flex flex-col'>
                    <div className='flex'>
                        <OrderQty />
                        <OrderItem />
                        <OrderCategory />
                    </div>
                    <div className='bg-white'>
                        <p className='text-secondary'>Footer</p>
                    </div>
                </div>
            </div>
            <OrderFooter />
        </div>
    )
}

export default Order
