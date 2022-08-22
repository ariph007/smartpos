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
            extraCharge: req.body.extraCharge,
            rounding: req.body.rounding,
            subtotal: req.body.subtotal,
            total: req.body.total,
            invoice_id: getInvoiceId
        });
        const getSalesId = getSales.id

        const items = req.body.item;
        
        let getItemSale = null;
        await items.map((item) => {
            getItemSale =  sales_lines.create({
                created: pcName,
                description: item.description,
                discountAmount: item.discountAmount,
                discountName: item.discountName,
                discountValue: item.discountValue,
                serviceChargeRate: item.serviceChargeRate,
                unitPrice : item.unitPrice,
                item_id: item.item_id,
                employee_id: item.employee_id,
                discount_id: item.discount_id,
                sales_id: getSalesId
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