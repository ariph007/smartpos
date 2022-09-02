export const totalItemPrice = (qty, price) => {
    return qty * price
};

export const taxAmount = (taxRate, itemPrice) => {
    return (Number(taxRate) / 100) * Number(itemPrice)
};

export const serviceChargeAmount = (serviceRate, itemPrice) => {
    return (Number(serviceRate) / 100) * Number(itemPrice)
};

export const totalPay = (tax, serviceCharge, rounding, subtotal) => {
    return Number(tax + serviceCharge + rounding + subtotal)
};


export const totalAfterRounding = (tax, serviceCharge, subtotalItem, rounding, disc) => {
    tax = parseInt(tax);
    disc = disc ? parseInt(disc) : 0
    serviceCharge = parseInt(serviceCharge);
    subtotalItem = parseInt(subtotalItem);
    rounding = parseInt(rounding);
    let totalPay = Math.ceil((tax + serviceCharge + (subtotalItem - disc)) / rounding) * rounding;
    return totalPay
};

export const totalBeforeRounding = (tax, serviceChargeAmount, subtotalItem) => {
    let totalPay = Number(tax + serviceChargeAmount + subtotalItem);
    return totalPay
};

export const isNumeric = (value) => {
    return /^\d+$/.test(value);
};
