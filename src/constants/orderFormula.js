const totalItemPrice = (qty, price) => {
    return qty * price
};

const taxAmount = (taxRate, itemPrice) => {
    return (Number(taxRate) / 100) * Number(itemPrice)
};

const serviceChargeAmount = (serviceRate, itemPrice) => {
    return (Number(serviceRate) / 100) * Number(itemPrice)
};

const totalPay = (tax, serviceCharge, rounding, subtotal) => {
    return Number(tax + serviceCharge + rounding+ subtotal)
};


const totalAfterRounding = (tax, serviceCharge, subtotalItem, rounding) => {
    tax = parseInt(tax);
    serviceCharge = parseInt(serviceCharge);
    subtotalItem = parseInt(subtotalItem);
    rounding = parseInt(rounding);



    let totalPay =  Math.ceil((tax + serviceCharge + subtotalItem)/rounding)*rounding;
    return totalPay
};

const totalBeforeRounding = (tax,serviceChargeAmount, subtotalItem) => {
    let totalPay = Number(tax + serviceChargeAmount + subtotalItem);
    return totalPay
};

const isNumeric = (value) => {
    return /^\d+$/.test(value);
};


export {serviceChargeAmount, taxAmount, totalAfterRounding, totalItemPrice, totalPay, totalBeforeRounding, isNumeric}