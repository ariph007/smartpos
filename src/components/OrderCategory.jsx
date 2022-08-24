import React from 'react';
import { category } from '../constants/category';

const OrderCategory = () => {
    const slideLeft = () => {
        let slider = document.getElementById('sliderCategory')
        slider.scrollTop = slider.scrollTop - 500
    }

    const slideRight = () => {
        let slider = document.getElementById('sliderCategory')
        slider.scrollTop = slider.scrollTop + 500
    }

    return (
        <div className='w-1/12 max-h-screen'>
            <div
                id='sliderCategory'
                className='w-full h-[70%] flex flex-col gap-2  overflow-y-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {category?.map((item, index) => (
                    <p className='bg-secondary hover:bg-neutral-600 py-4 text-xs rounded-md text-center cursor-pointer'>{item.name}</p>
                ))}
            </div>
            <div className='flex flex-col gap-2'>
                <p 
                onClick={slideLeft}
                className='text-secondary text-center font-semibold bg-chiffon hover:bg-navajo cursor-pointer py-2 rounded-md'>PREV</p>
                <p 
                onClick={slideRight}
                className='text-secondary text-center font-semibold bg-chiffon hover:bg-navajo cursor-pointer py-2 rounded-md'>NEXT</p>
            </div>
        </div>
    )
}

export default OrderCategory
