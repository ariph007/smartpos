import { data } from 'autoprefixer'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import Draggable from 'react-draggable'
import { Resizable, ResizableBox } from 'react-resizable'
import { useNavigate } from 'react-router-dom'
import instance from '../services/axiosConfig'

const Dashboard = () => {
    const [tables, setTables] = useState([])
    const navigate = useNavigate();

    const getTables = async () => {
        await instance.get('/table')
            .then((result) => {
                console.log(result.data.data)
                setTables(result.data.data)
            }).catch((err) => {
                console.log(err)
            });
    }

    // const tables = [
    //     {
    //         "id": 1,
    //         "capacity": 2,
    //         "height": 100,
    //         "width": 100,
    //         "name": "TABLE 1",
    //         "x": 50,
    //         "y": 25,
    //         "createdAt": "2022-09-06T13:42:38.000Z",
    //         "updatedAt": "2022-09-06T13:42:38.000Z"
    //     },
    //     {
    //         "id": 2,
    //         "capacity": 2,
    //         "height": 100,
    //         "width": 100,
    //         "name": "TABLE 2",
    //         "x": 225,
    //         "y": -75,
    //         "createdAt": "2022-09-06T13:43:29.000Z",
    //         "updatedAt": "2022-09-06T13:43:29.000Z"
    //     },
    //     {
    //         "id": 3,
    //         "capacity": 2,
    //         "height": 100,
    //         "width": 100,
    //         "name": "TABLE 3",
    //         "x": 50,
    //         "y": 100,
    //         "createdAt": "2022-09-06T13:49:17.000Z",
    //         "updatedAt": "2022-09-06T13:49:17.000Z"
    //     },
    //     {
    //         "id": 4,
    //         "capacity": 2,
    //         "height": 100,
    //         "width": 100,
    //         "name": "TABLE 4",
    //         "x": 225,
    //         "y": 0,
    //         "createdAt": "2022-09-06T13:49:51.000Z",
    //         "updatedAt": "2022-09-06T13:49:51.000Z"
    //     }
    // ]


    const [positions, setPositions] = useState({});
    const handleStop = (e, data) => {
        // let dummyPositions = { ...positions };
        // const width = document.getElementById()
        const itemId = e.target.id;
        console.log(`x : ${data.x}`);
        console.log(`y : ${data.y}`);
        console.log(`itemId : ${itemId}`);
        const yWindow = window.scrollY + document.getElementById(itemId).getBoundingClientRect().top // Y
        const xWindow = window.scrollX + document.getElementById(itemId).getBoundingClientRect().left // X
        console.log(`Xwindow : ${xWindow}`);
        console.log(`YWindow : ${yWindow}`);

    }

    const getSize = (table) => {
        // const width = document.getElementById(table.name).offsetWidth;
        // const height = document.getElementById(table.name).offsetHeight;
        console.log(`table : ${table.x}`)
        console.log(`table : ${table.y}`)
    };
    const tableHandler = (table) =>{
        navigate(`/order/${table}`)
        console.log(table);
    }


    useEffect(() => {
        getTables();
    }, [])

    return (
        <div className='w-full min-h-[100vh] max-h-[100vh] max-w-[100vw]'>
            {tables?.map((table, i) => (
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
                    
                    <p
                        // onClick={()=>getSize(table)}
                        id={table.name}
                        onClick={()=>tableHandler(table.name)}
                        className="p-1 items-center flex justify-center text-center bg-danger cursor-pointer text-white text-lg rounded-lg"
                        style={{ width: table.width, height: table.height}}
                    >
                        {/* {table.name}: {table.x}-{table.y} */}
                        {table.name}
                    </p>
                </Draggable>
            ))}

            {/* <Draggable
                bounds="parent"
                defaultPosition={{x:50, y:25}}
            >
                <p
                    className='p-1 py-8 w-[100px] h-[100px] text-center bg-danger cursor-pointer text-white text-lg rounded-lg'
                >Table 1</p>
            </Draggable>
            <Draggable
                bounds="parent"
                defaultPosition={{x:225, y:-75}}
            >
                <p
                    className='p-1 py-8 w-[100px] h-[100px] text-center bg-danger cursor-pointer text-white text-lg rounded-lg'
                >Table 2</p>
            </Draggable>
            <Draggable
                bounds="parent"
                defaultPosition={{x:225, y:0}}
            >
                <p
                    className='p-1 py-8 w-[100px] h-[100px] text-center bg-danger cursor-pointer text-white text-lg rounded-lg'
                >Table 3</p>
            </Draggable> */}
        </div>
    )
}

export default Dashboard
