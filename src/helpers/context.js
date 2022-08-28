import React, { useState } from "react";
import instance from "../services/axiosConfig";
export const ContextProvider = React.createContext(null);

export const ContextWrapper = props => {
    const [items, setItems] = useState([]);
    const [listOrders, setListOrders] = useState([]);
    const [activeItem, setActiveItem] = useState([]);

    return (
        <ContextProvider.Provider value={{ items, setItems, listOrders, setListOrders, activeItem, setActiveItem }}>
            {props.children}
        </ContextProvider.Provider>
    )
}