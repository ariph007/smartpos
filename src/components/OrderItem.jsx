import React, { useState } from 'react';
import { product } from '../constants/product';

const OrderItem = () => {
  const [orderItems, setOrderItems] = useState([]);

  const oderItemsHandler = (item) => {
    setOrderItems(prev => [...prev, item])
    console.log(orderItems)
  }

  return (
    <div className='w-10/12'>
      <div className='grid grid-cols-5 gap-2 mr-4 text-sm font-medium justify-center items-center'>
        {product?.map((item, index)=> (
          <div 
          onClick={() => oderItemsHandler(item)}
          key={index} 
          className='bg-secondary hover:bg-neutral-600 px-2 cursor-pointer flex justify-center h-[60px] rounded-md text-center items-center'>
            <p className='text-xs'>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderItem
