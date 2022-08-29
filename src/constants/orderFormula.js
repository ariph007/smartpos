export const totalItemPrice = (qty, price) => {
    return qty * price
};

export const taxAmount = (taxRate, itemPrice) => {
    return (Number(taxRate) / 100) * Number(itemPrice)
}
export const serviceChargeAmount = (serviceRate, itemPrice) => {
    return (Number(serviceRate) / 100) * Number(itemPrice)
}