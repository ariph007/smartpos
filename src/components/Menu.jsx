import React from 'react'
import { MdArrowBackIosNew, MdCancel, MdOutlineSettingsApplications, MdOutlineSave, MdOutlinePayments } from 'react-icons/md'

const Menu = () => {
    return (
        <div className='grid grid-cols-5 gap-4 overflow-hidden'>
            <div className='bg-[#2C3A47] hover:bg-[#2C3A47]/90 cursor-pointer py-2 rounded-md ml-2 flex justify-center items-center'>
                <MdArrowBackIosNew size={24} color={'#fff'} className='mr-4' />
                <p className='text-white text-center font-semibold'>BACK</p>
            </div>
            <div className='bg-danger hover:bg-danger/90 cursor-pointer py-2 rounded-md ml-2 flex justify-center items-center'>
                <MdCancel size={24} color={'#fff'} className='mr-4' />
                <p className='text-white ml-1 text-center font-semibold '>VOID CHECK</p>
            </div>
            <div className='bg-[#F97F51] hover:bg-[#F97F51]/90 cursor-pointer py-2 rounded-md ml-2 flex justify-center items-center'>
                <MdOutlineSettingsApplications size={24} color={'#fff'} className='mr-4' />
                <p className='text-white text-center font-semibold'>UTILITIES</p>
            </div>
            <div className='bg-[#3498db] hover:bg-[#3498db]/90 cursor-pointer py-2 rounded-md ml-2 flex justify-center items-center'>
                <MdOutlineSave size={24} color={'#fff'} className='mr-4' />
                <p className='text-white text-center font-semibold'>SAVE</p>
            </div>
            <div className='bg-success hover:bg-success/90 cursor-pointer py-2 rounded-md ml-2 flex justify-center items-center'>
                <MdOutlinePayments size={24} color={'#fff'} className='mr-4' />
                <p className='text-white text-center font-semibold'>PAY</p>
            </div>
        </div>
    )
}

export default Menu
