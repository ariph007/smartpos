import React, { useState } from "react";
import instance from "../services/axiosConfig";
export const ContextProvider = React.createContext(null);

export const ContextWrapper = props => {
    const [items, setItems] = useState([]);
    const [listOrders, setListOrders] = useState([]);
    const [activeItem, setActiveItem] = useState([]);
    const [totalOrderAmount, setTotalAmount] =  useState([])
    const [setting, setSetting] =  useState({})

    return (
        <ContextProvider.Provider 
        value={{ 
            items, 
            setItems, 
            listOrders, 
            setListOrders, 
            activeItem, 
            setActiveItem,
            totalOrderAmount,
            setTotalAmount,
            setting,
            setSetting }}>
            {props.children}
        </ContextProvider.Provider>
    )
}