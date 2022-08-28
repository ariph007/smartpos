import React from 'react'
import Menu from '../components/Menu'
import OrderCategory from '../components/OrderCategory'
import OrderDetail from '../components/OrderDetail'
import OrderFooter from '../components/OrderFooter'
import OrderItem from '../components/OrderItem'
import OrderQty from '../components/OrderQty'

const Order = () => {
    return (
        <div className='flex flex-col w-[95%] 2xl:max-w-[1536px] mt-4 max-h-screen m-auto overflow-hidden'>
            <div className='flex w-full max-h-[90%] overflow-hidden'>
                <OrderDetail />
                <div className='w-9/12 flex flex-col'>
                    <div className='flex max-h-[86%] relative'>
                        <OrderQty />
                        <OrderItem />
                        <OrderCategory />
                    </div>
                    <Menu/>
                </div>
            </div>
        </div>
    )
}

export default Order
