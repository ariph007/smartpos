import React, { useContext, useEffect, useState } from 'react';
import instance from '../services/axiosConfig';
import { ContextProvider } from '../helpers/context';

const OrderCategory = () => {
    const [category, setCategory] = useState([]);
    const {  setItems } = useContext(ContextProvider);
    // const [activeCategory, setActiveCategory] = useState(null)

    const getCategory = async () => {
        await instance.get('/category')
            .then((result) => {
                setCategory(result.data.data);
            }).catch((err) => {
                console.log(err)
            });
    };

    const slideTop = () => {
        let slider = document.getElementById('sliderCategory')
        slider.scrollTop = slider.scrollTop - 100
    };

    const slideBottom = () => {
        let slider = document.getElementById('sliderCategory')
        slider.scrollTop = slider.scrollTop + 100
    };

    const getItems = async (categoryId) => {
        // console.log(categoryId)
        await instance.get(`/item/category/${categoryId}`,)
            .then((result) => {
                setItems(result.data.data)
            //    console.log(result.data.data[0].name)
            }).catch((err) => {
                console.log(err)
            });
    };

    const categoryHandler = (categoryId) => {
        getItems(categoryId);
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div className='w-1/12 max-h-screen'>
            <div
                id='sliderCategory'
                className='w-full h-[80%] flex flex-col gap-2 overflow-y-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {category.map((item, index) => (
                    <p
                        onClick={() => categoryHandler(item.id)}
                        key={index}
                        className='bg-secondary hover:bg-neutral-600 py-4 text-xs rounded-md text-center cursor-pointer'>
                        {item.name}
                    </p>
                ))}
            </div>
            <div className='flex flex-col gap-2 h-[20%] '>
                <p
                    onClick={slideTop}
                    className='text-secondary text-center font-semibold bg-chiffon hover:bg-navajo cursor-pointer py-2 rounded-md'>PREV</p>
                <p
                    onClick={slideBottom}
                    className='text-secondary text-center font-semibold bg-chiffon hover:bg-navajo cursor-pointer py-2 rounded-md'>NEXT</p>
            </div>
        </div>
    )
}

export default OrderCategory
