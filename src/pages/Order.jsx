import React from 'react'
import OrderCategory from '../components/OrderCategory'
import OrderDetail from '../components/OrderDetail'
import OrderFooter from '../components/OrderFooter'
import OrderItem from '../components/OrderItem'

const Order = () => {
    return (
        <div className='flex flex-col w-[90%] 2xl:max-w-[1536px] mt-4 h-screen m-auto'>
            <div className='flex w-full h-[90%]'>
                <OrderDetail />
                <OrderItem />
                <OrderCategory />
            </div>
            <OrderFooter />
        </div>
    )
}

export default Order
