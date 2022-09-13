import React, { useState } from "react";
export const ContextProvider = React.createContext(null);

export const ContextWrapper = props => {
    const [loginInformation, setLoginInformation] = useState([]);
    const [items, setItems] = useState([]);
    const [listOrders, setListOrders] = useState([]);
    const [activeItem, setActiveItem] = useState([]);
    const [totalOrderAmount, setTotalAmount] = useState([]);
    const [setting, setSetting] = useState({});
    const [indexItem, setIndexItem] = useState(0);
    const [orderInfo, setOrderInfo] = useState({
        table: '',
        totalGuest: '2',
        totalTax: 0,
        totalDisc: 0,
        totalServiceCharge: 0,
        totalAmountRounding: 0,
        subTotalItem: 0,
        totalMustPaid: 0,
        totalQty: 0,
        totalItem: 0
    });
    // const [subtotalDisc, setSubtotalDisc] = useState();
    const [selectedDisc, setSelectedDisc] = useState([]);
    // const [token, setToken] = useState('')

    return (
        <ContextProvider.Provider
            value={{
                loginInformation,
                setLoginInformation,
                items,
                setItems,
                listOrders,
                setListOrders,
                activeItem,
                setActiveItem,
                totalOrderAmount,
                setTotalAmount,
                setting,
                setSetting,
                indexItem,
                setIndexItem,
                selectedDisc,
                setSelectedDisc,
                orderInfo,
                setOrderInfo
            }}>
            {props.children}
        </ContextProvider.Provider>
    )
}