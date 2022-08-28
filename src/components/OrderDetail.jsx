import React, { useContext, useEffect, useRef, useState } from 'react';
import { Items } from '../constants/items';
import { thousandSeperator } from '../constants/thousandSeperator';
import { FiTrash2 } from 'react-icons/fi';
import { ContextProvider } from '../helpers/context';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OrderDetail = () => {
    const { listOrders, setListOrders,activeItem, setActiveItem } = useContext(ContextProvider);

    const searchInputRef = useRef(null);

    const doubleItemClick = () => {
        setActiveItem(prevState => ({
            ...prevState,
            isActive: false
        }));
    };

    const itemDetailHandler = (item) => {
        setActiveItem(prevState => ({
            ...prevState,
            id: item.id,
            index: item.index,
            itemName: item.itemName,
            qty: item.qty,
            // price: item.itemPrice,
            totalItemPrice: item.totalItemPrice,
            isActive: true
        }));
        // console.log(listOrders)
    };

    const voidItemHandler = (item) => {
        console.log(item)
        // console.log(i)
        console.log(listOrders)
        setListOrders(current =>
            current.filter(order => {
                return order.index !== item.index
            })
        )
    }


    // const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        searchInputRef.current.focus();
        AOS.init({
            duration: 300
        });
    }, [activeItem, listOrders]);

    return (
        <div className='w-3/12 overflow-hidden'>
            <input
                ref={searchInputRef}
                type="text"
                className='focus:outline-1 w-full rounded-sm bg-secondary/90 h-8 indent-2 focus-within:shadow-md focus' />
            <div className='mt-4 flex flex-col max-h-screen relative'>
                <div className='max-h-[55vh] min-h-[55vh] overflow-y-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {listOrders?.map((item, i) => (
                        <div key={i} data-aos="fade-up" onClick={() => itemDetailHandler(item)} onDoubleClick={() => doubleItemClick()}
                            className={activeItem.id === item.id && activeItem.isActive === true ? "flex cursor-pointer text-xs w-full mb-4 bg-neutral-600 hover:bg-secondary/60 h-10 items-center gap-4 rounded-md" : 'flex cursor-pointer text-xs w-full mb-4 bg-secondary hover:bg-neutral-600 h-10 items-center gap-4 rounded-md'}>
                            {
                                activeItem.id === item.id && activeItem.isActive === true && activeItem.index === item.index ?
                                    <div  onClick={() => voidItemHandler(item, i)} className='bg-secondary hover:bg-slate-700 h-full px-3 rounded-md flex justify-center items-center'>
                                        <FiTrash2 color='#df4759' size={20} />
                                    </div>
                                    :
                                    <p data-aos="fade-left" className='bg-white z-40 px-1 text-secondary rounded-full ml-2'>{i + 1}</p>
                            }
                            <p className='w-9/12'>{item.itemName}</p><span>{item.qty}</span>
                            {/* <p className='text-right w-2/12 mr-2'>{thousandSeperator(item?.subtotal)}</p> */}
                            <p className='text-right w-2/12 mr-2'>{thousandSeperator(item.totalItemPrice)}</p>
                        </div>
                    ))}
                </div>
                <div className='max-h-[32vh] min-h-[32vh] mb-2 w-full bg-secondary rounded-md px-2 text-xs z-40'>
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
                        <div className='flex w-full justify-between mb-6'>
                            <p>SUBTOTAL</p>
                            <p>412.600</p>
                        </div>
                        <div className='flex w-full justify-between mb-2'>
                            <p>TOTAL ITEM <span>6</span></p>
                            <p>TOTAL QTY <span>21</span></p>
                        </div>
                    </div>
                    <div className='mt-4 pb-4'>
                        <div className='flex justify-between text-xl font-medium pb-4'>
                            <p>Total</p>
                            <p>Rp 724.500</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
