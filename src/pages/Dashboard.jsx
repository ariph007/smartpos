import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import instance from '../services/axiosConfig';
import { ContextProvider } from '../helpers/context';
import { thousandSeperator } from '../constants/thousandSeperator';


const Dashboard = () => {
    let {
        orderInfo,
        setOrderInfo,
        // loginInformation
    } = useContext(ContextProvider);

    const [tables, setTables] = useState([]);
    const [salesUnpaid, setSalesUnpaid] = useState([]);
    const navigate = useNavigate();

    // const getSalesUnpaid = async () => {
    //     await instance.get('/sales/unpaid')
    //         .then((result) => {
    //             setSalesUnpaid(result.data.data)
    //             console.log(result.data.data)
    //         }).catch((err) => {
    //             console.log(err)
    //         });
    //     }

    const getTables = async () => {
        let unpaid = []
        await instance.get('/sales/unpaid')
            .then((result) => {
                unpaid = result.data.data
            }).catch((err) => {
                console.log('error')
            });

        await instance.get('/table')
            .then((result) => {
                let tempTable = result.data.data
                let tab = []
                for (const table of tempTable) {
                    for (const sales of unpaid) {
                        if (sales.customerName === table.name) {
                            table.unpaid = true;
                            table.salesId = sales.id;
                            table.total = sales.total;
                            table.totalGuest = sales.totalGuest
                        }
                    }

                }
                setTables(tempTable)
            }).catch((err) => {
                console.log(err)
            });
    };

    const handleStop = (e, data) => {
        const itemId = e.target.id;
        console.log(`x : ${data.x}`);
        console.log(`y : ${data.y}`);
        console.log(`itemId : ${itemId}`);
        const yWindow = window.scrollY + document.getElementById(itemId).getBoundingClientRect().top // Y
        const xWindow = window.scrollX + document.getElementById(itemId).getBoundingClientRect().left // X
        console.log(`Xwindow : ${xWindow}`);
        console.log(`YWindow : ${yWindow}`);

    }


    const [guestPopUp, setGuestPopUp] = useState(false);

    const tableHandler = (table) => {
        setOrderInfo({
            ...orderInfo,
            table: table
        });
        setGuestPopUp(!guestPopUp);
    };

    const guestNumberHandler = (number) => {
        setOrderInfo({
            ...orderInfo,
            totalGuest: orderInfo.totalGuest === '0' ? number : orderInfo.totalGuest === '2' && number !== '2' ? number : orderInfo.totalGuest + number
        });
    }

    const clearHandler = () => {
        setOrderInfo({
            ...orderInfo,
            totalGuest: ''
        });
    };

    const cancelHandler = () => {
        setGuestPopUp(!guestPopUp);
        setOrderInfo({
            ...orderInfo,
            totalGuest: '2'
        });
    };

    const deleteHandler = () => {
        let totalGuest = orderInfo.totalGuest.split('');
        totalGuest.pop();
        totalGuest = totalGuest.join('');
        setOrderInfo({
            ...orderInfo,
            totalGuest: totalGuest
        });
    };

    const guestInputHandler = (e) => {
        //prevent user input not number
        // guest: activeTable.guest === '0' ? number : activeTable.guest + number
        let userInput = e.target.value.replace(/\D/, '');
        //prevent user typing 0 for first number
        if (userInput === '') {
            userInput = ''
        }

        setOrderInfo({
            ...orderInfo,
            totalGuest: userInput
        });
    };

    const enterHandler = () => {
        if (!orderInfo.totalGuest === '0' || orderInfo.totalGuest !== '') {
            navigate(`/order/${orderInfo.table}`)
        }
    };

    const inputEnterHandler = async (e) => {
        if (e.key === 'Enter') {
            if (orderInfo.totalGuest !== '0' && orderInfo.totalGuest !== '') {
                console.log(orderInfo.totalGuest !== '')
                navigate(`/order/${orderInfo.table}`)
            }
        };
    };



    useEffect(() => {
        // getSalesUnpaid();
        getTables();
        console.log(tables)
    }, [orderInfo]);

    return (
        <div className='w-full min-h-[100vh] max-h-[100vh] max-w-[100vw] relative z-20'>
            {
                guestPopUp &&
                <div className='w-[100vw] h-[100vh] bg-primary/90 absolute z-30'>
                    <div className='rounded-md flex flex-col w-[380px] max-w-[380px] h-[440px] max-h-[440px] p-4 pb-16 bg-secondary absolute  bottom-1/4 left-[500px]'>
                        <p className=' text-center font-medium text-xl mb-4'>Total guest for TABEL {orderInfo.table}</p>
                        <div className='flex w-full h-full gap-4'>
                            <div className='flex flex-col w-4/6'>
                                <input
                                    onChange={(e) => guestInputHandler(e)}
                                    autoComplete='off'
                                    onBlur={({ target }) => target.focus()}
                                    autoFocus
                                    onKeyDown={inputEnterHandler}
                                    id='guestInput'
                                    inputMode='text'
                                    value={orderInfo.totalGuest}
                                    className='h-10 appearance-none rounded-sm text-primary font-semibold text-4xl w-full text-center' />
                                <div className='grid grid-cols-3 gap-4 mt-4'>
                                    <p onClick={() => guestNumberHandler('9')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>9</p>
                                    <p onClick={() => guestNumberHandler('8')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>8</p>
                                    <p onClick={() => guestNumberHandler('7')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>7</p>
                                    <p onClick={() => guestNumberHandler('6')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>6</p>
                                    <p onClick={() => guestNumberHandler('5')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>5</p>
                                    <p onClick={() => guestNumberHandler('4')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>4</p>
                                    <p onClick={() => guestNumberHandler('3')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>3</p>
                                    <p onClick={() => guestNumberHandler('2')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>2</p>
                                    <p onClick={() => guestNumberHandler('1')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl'>1</p>
                                    <p onClick={() => guestNumberHandler('0')} className='p-4 hover:cursor-pointer hover:bg-primary/60 text-center bg-primary rounded-md text-xl col-span-3'>0</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-4 w-2/6'>
                                <div onClick={() => deleteHandler()} className='px-4 py-2 hover:cursor-pointer hover:bg-primary/60 text-center justify-center items-center rounded-sm flex bg-primary'>
                                    <p>DELETE</p>
                                </div>
                                <div onClick={() => clearHandler()} className='px-4 py-2 hover:cursor-pointer hover:bg-primary/60 text-center justify-center items-center rounded-sm flex bg-primary'>
                                    <p>CLEAR</p>
                                </div>
                                <div onClick={() => cancelHandler()} className='px-4 py-2 hover:cursor-pointer hover:bg-primary/60 text-center justify-center items-center rounded-sm flex bg-primary'>
                                    <p>CANCEL</p>
                                </div>
                                <div onClick={() => enterHandler()} className='px-4 py-2 hover:cursor-pointer hover:bg-primary/60 text-center justify-center items-center rounded-sm flex bg-primary'>
                                    <p>ENTER</p>
                                </div>
                            </div>
                        </div>
                        <p className='text-xs font-light text-white/60 text-center bottom-2 left-0 absolute w-full'>SmartPOS</p>
                    </div>
                </div>
            }
            {tables?.map((table, i) => (        //tables has property tableName


                <Draggable
                    onStart={() => false}
                    key={table.id}
                    defaultPosition={
                        { x: table.x, y: table.y }
                    }
                    grid={[25, 25]}
                    draggableId={table.id}
                    onStop={handleStop}
                    bounds="parent"
                >
                    {/*
                         state unpaidSales has description === tableName 
                         loop unpaidSales and return p tag with className x if tableName === unpaidSales.description, else className y
                        */}
                    <div
                        id={table.name}
                        onClick={() => tableHandler(table.name)}
                        className={table.unpaid ?
                            "p-1 font-medium flex-col items-center flex justify-center text-center bg-warning/80 cursor-pointer text-white text-lg rounded-lg" :
                            "p-1 font-medium flex-col items-center flex justify-center text-center bg-slate-600 cursor-pointer text-white text-lg rounded-lg"}
                        style={{ width: table.width, height: table.height }}
                    >
                        <p>
                            {table.name}
                        </p>
                        {
                            table?.totalGuest &&
                            <p className='text-xs'>Guest {table.totalGuest}</p>
                        }
                        {
                            table?.total &&
                            <p className='text-xs'>Total {thousandSeperator(table.total)}</p>
                        }
                    </div>
                </Draggable>


            ))}
        </div>
    )
}

export default Dashboard
