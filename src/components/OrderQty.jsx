import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../helpers/context';
import { totalItemPrice, serviceChargeAmount, taxAmount, isNumeric } from '../constants/orderFormula';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrderQty = () => {
    const { listOrders, setListOrders, activeItem, setActiveItem, setting } = useContext(ContextProvider);
    const [qtyPopUp, setQtyPopPup] = useState(false);
    const [qty, setQty] = useState(1);
    const [errorQty, setErrorQty] = useState(false)

    const qtyPopUpHandler = () => {
        if (listOrders.length > 0 && activeItem > 0) {
            setQtyPopPup(!qtyPopUp);
        } else {
            toast.error("Please select item first", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500
            });
        }
    }

    const customQty = (e) => {
        const qty = Number(e.target.value);
        setQty(qty);
        if (isNumeric(qty)) {
            setErrorQty(false)
        } else {
            setErrorQty(true)
        }
    };
    const saveQty = () => {
        if (errorQty === false) {
            let orderFiltered = [];
            for (const item of listOrders) {
                if (item.index === activeItem) {
                    let newItem = [];
                    newItem = item;
                    newItem.qty = qty;
                    newItem.totalItemPrice = totalItemPrice(newItem.qty, newItem.itemPrice);
                    newItem.serviceChargeAmount = newItem.serviceCharge ? serviceChargeAmount(setting.serviceChargeRate, item.totalItemPrice) : 0;
                    newItem.taxAmount = newItem.tax ? taxAmount(setting.taxRate, newItem.totalItemPrice) : 0;
                    console.log(newItem)
                    orderFiltered.push(newItem)
                } else {
                    orderFiltered.push(item);
                }
            };
            setListOrders(orderFiltered);
            setQtyPopPup(!qtyPopUp);
        } else {
            setQtyPopPup(true);
        };
    };

    const handleKeydownQty = (e) => {
        if (e.key === 'Enter'){
            if (errorQty === false) {
                let orderFiltered = [];
                for (const item of listOrders) {
                    if (item.index === activeItem) {
                        let newItem = [];
                        newItem = item;
                        newItem.qty = qty;
                        newItem.totalItemPrice = totalItemPrice(newItem.qty, newItem.itemPrice);
                        newItem.serviceChargeAmount = newItem.serviceCharge ? serviceChargeAmount(setting.serviceChargeRate, item.totalItemPrice) : 0;
                        newItem.taxAmount = newItem.tax ? taxAmount(setting.taxRate, newItem.totalItemPrice) : 0;
                        console.log(newItem)
                        orderFiltered.push(newItem)
                    } else {
                        orderFiltered.push(item);
                    }
                };
                setListOrders(orderFiltered);
                setQtyPopPup(!qtyPopUp);
            } else {
                setQtyPopPup(true);
            };
        }
    }

    const qtyHandler = (qty) => {
        console.log(activeItem)
        if (listOrders.length > 0 && activeItem > 0) {
            let orderFiltered = [];
            // setListOrders(1)
            for (const item of listOrders) {
                if (item.index === activeItem) {
                    let newItem = [];
                    newItem = item;
                    newItem.qty = qty;
                    newItem.totalItemPrice = totalItemPrice(newItem.qty, newItem.itemPrice);
                    newItem.serviceChargeAmount = newItem.serviceCharge ? serviceChargeAmount(setting.serviceChargeRate, item.totalItemPrice) : 0;
                    newItem.taxAmount = newItem.tax ? taxAmount(setting.taxRate, newItem.totalItemPrice) : 0;
                    console.log(newItem)
                    orderFiltered.push(newItem)
                } else {
                    orderFiltered.push(item)
                }
            }
            setListOrders(orderFiltered)
        } else {
            toast.error("Please select item first", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500
            });
        }
    };
    return (
        <div className='w-1/12 ml-2'>
            <ToastContainer limit={1} />
            {qtyPopUp &&
                <div className='absolute z-40 right-1/2 bottom-1/2 bg-neutral-600 top-40 flex flex-col rounded-md justify-center w-[300px] h-[140px]' >
                    <p className='mt-2 text-center'>Please input new quanity</p>
                    <input
                        onKeyDown={handleKeydownQty}
                        onChange={customQty}
                        type="text"
                        className='focus:outline-1 text-center w-[50%] justify-center m-auto rounded-sm bg-secondary/90 h-8 indent-2 focus-within:shadow-md focus' />
                    {errorQty && <p className='text-danger text-center font-medium text-sm'>Input must number</p>}
                    <button onClick={saveQty} className='bg-secondary w-fit px-4 rounded-sm py-1 m-auto mb-2'>SAVE</button>
                </div>}
            <div className='w-2/3  flex flex-col items-center justify-center'>
                <p onClick={() => qtyHandler(1)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>1</p>
                <p onClick={() => qtyHandler(2)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>2</p>
                <p onClick={() => qtyHandler(3)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>3</p>
                <p onClick={() => qtyHandler(4)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>4</p>
                <p onClick={() => qtyHandler(5)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>5</p>
                <p onClick={() => qtyHandler(6)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>6</p>
                <p onClick={() => qtyHandler(7)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>7</p>
                <p onClick={() => qtyHandler(8)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>8</p>
                <p onClick={() => qtyHandler(9)} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>9</p>
                <p onClick={() => qtyPopUpHandler()} className='cursor-pointer hover:bg-neutral-600 w-full py-2 text-center rounded-md mb-4 bg-secondary'>QTY</p>
            </div>
        </div>
    )
}

export default OrderQty
