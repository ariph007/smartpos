import React, { useContext, useState } from 'react'
import { MdArrowBackIosNew, MdCancel, MdOutlineSettingsApplications, MdOutlineSave, MdOutlinePayments, MdClose } from 'react-icons/md'
import { TbDiscount2 } from "react-icons/tb";
import DiscMenu from './DiscMenu';
import instance from '../services/axiosConfig';
import { ContextProvider } from '../helpers/context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Menu = () => {
    const navigate = useNavigate();
    const [discMenu, setDiscMenu] = useState(false);
    const [listDisc, setListDisc] = useState([]);
    let {
        listOrders,
        setListOrders,
        setting,
        selectedDisc,
        setSelectedDisc,
        orderInfo,
        setOrderInfo
    } = useContext(ContextProvider);


    const discMenuHandler = () => {
        setDiscMenu(!discMenu);
        instance.get('/discount')
            .then((result) => {
                setListDisc(result.data.data)
                console.log(listDisc)
            }).catch((err) => {
            });
    };

    const saveHandler = () => {
        console.log(orderInfo)
        console.log(listOrders)
    }
    const btnBackHandler = () => {
        listOrders.length >= 1 ?
            Swal.fire({
                title: 'Are you sure?',
                text: "Your order list not empty",
                icon: 'warning',
                background: '#2d2d2d',
                showCancelButton: true,
                color: '#ffffff',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#df4759',
                confirmButtonText: 'Yes, go back'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashboard');
                    
                }
            }) 
            :
            navigate('/dashboard');
    }

    return (
        <div className='grid grid-cols-6 gap-4 overflow-hidden'>
            {
                discMenu && <DiscMenu listDisc={listDisc} discMenu={discMenu} setDiscMenu={setDiscMenu} />
            }
            <div onClick={btnBackHandler} className='bg-[#2C3A47] hover:bg-[#2C3A47]/90 cursor-pointer py-2 rounded-md ml-1 flex justify-center items-center'>
                <MdArrowBackIosNew size={24} color={'#fff'} className='mr-2' />
                <p className='text-white text-sm text-center font-semibold'>BACK</p>
            </div>
            <div className='bg-danger hover:bg-danger/90 cursor-pointer py-2 rounded-md ml-1 flex justify-center items-center'>
                <MdCancel size={24} color={'#fff'} className='mr-2' />
                <p className='text-white text-sm ml-1 text-center font-semibold '>VOID CHECK</p>
            </div>
            <div className='bg-[#F97F51] hover:bg-[#F97F51]/90 cursor-pointer py-2 rounded-md ml-1 flex justify-center items-center'>
                <MdOutlineSettingsApplications size={24} color={'#fff'} className='mr-2' />
                <p className='text-white text-sm text-center font-semibold'>UTILITIES</p>
            </div>
            <div onClick={discMenuHandler} className='bg-[#3498db] hover:bg-[#3498db]/90 cursor-pointer py-2 rounded-md ml-1 flex justify-center items-center'>
                <TbDiscount2 size={24} color={'#fff'} className='mr-2' />
                <p className='text-white text-sm text-center font-semibold'>DISC</p>
            </div>
            <div
                onClick={saveHandler}
                className='bg-[#3498db] hover:bg-[#3498db]/90 cursor-pointer py-2 rounded-md ml-1 flex justify-center items-center'>
                <MdOutlineSave size={24} color={'#fff'} className='mr-2' />
                <p className='text-white text-sm text-center font-semibold'>SAVE</p>
            </div>
            <div className='bg-success hover:bg-success/90 cursor-pointer py-2 rounded-md ml-1 flex justify-center items-center'>
                <MdOutlinePayments size={24} color={'#fff'} className='mr-2' />
                <p className='text-white text-sm text-center font-semibold'>PAY</p>
            </div>
        </div>
    )
}

export default Menu
