const {sales, invoices, sales_lines} = require('../models');
const os = require('os')
// const { validationResult } = require('express-validator');

exports.createSales = async ( req, res) => {
    try {
        const dateTimeNow = new Date().toLocaleString();
        const getInvoices = await invoices.create({
            date: dateTimeNow
        });
        const getInvoiceId = getInvoices.id

        const pcName = os.hostname();

        const getSales = await sales.create({
            created: pcName,
            customerName: req.body.customerName,
            discountAmount: req.body.discountAmount,
            serviceCharge: req.body.serviceCharge,
            rounding: req.body.rounding,
            subtotal: req.body.subtotal,
            total: req.body.total,
            invoice_id: getInvoiceId,
            totalGuest: req.body.totalGuest,
            totalItem: req.body.totalItem,
            totalQty: req.body.totalQty,
            paymentMethodId: req.body.paymentMethod_id,
            tax: req.body.tax,
            employee_id: req.body.employee_id
        });
        const getSalesId = getSales.id;

        const items = req.body.item;
        console.log('==========================')
        console.log(items)
        
        let getItemSale = null;
        await items.map((item) => {
            getItemSale =  sales_lines.create({
                created: pcName,
                description: item.itemName,
                discountAmount: item.discountAmunt || 0,
                discountName: item.discName || '',
                serviceCharge: item.serviceChargeAmount,
                unitPrice : item.itemPrice,
                itemId: item.id,
                quantity: item.qty,
                employeeId: 1,
                discountId: item.discId || null,
                saleId: getSalesId,
                index: item.index,
                tax: item.taxAmount,
                totalPrice: item.totalItemPrice,
            })
        });

        res.status(200).send({
            message: {getInvoiceId, getSales}
        })

    } catch (error) {
        res.status(500).send({
            message : error.message || "Something went wrong while create new category"
        })
    }
};


exports.getUnpaidSales = async (req, res) => {
    try {
        let unpaidSales = await sales.findAll({
            where: {
                paymentMethod_id : null
            }
        });

        return res.status(200).send({
            message: "Retrieve success",
            data: unpaidSales
        })
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get unpaid sales",
            data : null
        })
    }
}


// exports.addItemSales = async (req, res) => {
//     try {
//         let add = await sales_lines.update({
//             description: req.body.description,
//             discountAmount : req.body.discountAmount,
//             discountName : req.body.discountName,
//             serviceChargeRate: req.body.serviceChargeRate,
//             unitPrice: req.body.unitPrice,
//             item_id: req.body.item_id,
//             quantity: req.body.quantity,
//             employee_id: req.body.employee_id,
//             discount_id: req.body.discount_id
//         });

//         return res.status(201).send({
//             message: "Item added"
//         })
//     } catch (error) {
//         return res.status(500).send({
//             code : 500,
//             status: false,
//             message: error.message || "Something went wrong while add item",
//             data: null
//         });
//     };
// };