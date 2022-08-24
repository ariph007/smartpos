import React, { useEffect, useRef } from 'react';
import { Items } from '../constants/items';
import { thousandSeperator } from '../constants/thousandSeperator';

const OrderDetail = () => {
    const searchInputRef = useRef(null);

    useEffect(() => {
        searchInputRef.current.focus();
    }, [])

    return (
        <div className='w-3/12'>
            <input
                ref={searchInputRef}
                type="text"
                className='focus:outline-1 w-full rounded-sm bg-secondary/90 h-8 indent-2 focus-within:shadow-md focus' />
            <div className='mt-4'>
                {Items?.map((item,index) => (
                    <div className='flex text-xs w-full mb-4 bg-secondary h-10 items-center gap-4 rounded-md' key={index}>
                        <p className='bg-white w-fit px-1 text-secondary rounded-full ml-2'>{index+1}</p>
                        <p className='w-9/12'>{item?.name}</p><span>{item?.qty}</span>
                        <p className='text-right w-2/12 mr-2'>{thousandSeperator(item?.subtotal)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderDetail
