import React, { useEffect, useRef, useState } from 'react';
import { Items } from '../constants/items';
import { thousandSeperator } from '../constants/thousandSeperator';

const OrderDetail = () => {
    const [activeItem, setActiveItem] = useState({
        id: "",
        name: "",
        qty: null,
        price: null,
        active: false
    });

    const searchInputRef = useRef(null);

    const doubleItemClick = () => {
        setActiveItem(prevState => ({
            ...prevState,
            active: false
        }));
    };
    
    const itemDetailHandler = (item) => {
        setActiveItem(prevState => ({
            ...prevState,
            id: item.id,
            name: item.name,
            qty: item.qty,
            price: item.price,
            active: true
        }));
    };

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    return (
        <div className='w-3/12'>
            <input
                ref={searchInputRef}
                type="text"
                className='focus:outline-1 w-full rounded-sm bg-secondary/90 h-8 indent-2 focus-within:shadow-md focus' />
            <div className='mt-4'>
                <div className='max-h-1/2'>
                    {Items?.map((item, i) => (
                        <div key={i} onClick={()=>itemDetailHandler(item)} onDoubleClick={()=>doubleItemClick()}
                        className={activeItem.id === item.id && activeItem.active === true ? "flex cursor-pointer text-xs w-full mb-4 bg-neutral-600 hover:bg-secondary h-10 items-center gap-4 rounded-md" : 'flex cursor-pointer text-xs w-full mb-4 bg-secondary hover:bg-neutral-600 h-10 items-center gap-4 rounded-md'}>
                            <p className='bg-white w-fit px-1 text-secondary rounded-full ml-2'>{i+1}</p>
                            <p className='w-9/12'>{item?.name}</p><span>{item?.qty}</span>
                            <p className='text-right w-2/12 mr-2'>{thousandSeperator(item?.subtotal)}</p>
                        </div>
                    ))}
                </div>
                <div className='h-1/2 bg-secondary rounded-md px-2 text-xs'>
                    <div className='border-b-2 border-dotted'>
                        <div className='flex w-full justify-between mb-2 pt-4'>
                            <p>TAX</p>
                            <p>12.590</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>SERVICE CHARGE</p>
                            <p>4.590</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>ROUNDING</p>
                            <p>60</p>
                        </div>
                        <div className='flex w-full justify-between mb-12'>
                            <p>SUBTOTAL</p>
                            <p>412.600</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>TOTAL ITEM <span>6</span></p>
                            <p>TOTAL QTY <span>21</span></p>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between text-xl font-medium pb-4'>
                            <p>Total</p>
                            <p>Rp 524.500</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
