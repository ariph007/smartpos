const { items } = require('../models');
const { validationResult } = require('express-validator');


exports.createItem = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: errors.errors[0].msg
        });
    };

    try {
        let image = null
        if (!req.file) {
            image = null
        } else {
            image = req.file.path
            const size = req.file.size;
            if (size > 2000000) {
                return res.status(413).send({
                    message: "Max size 2MB"
                })
            }
        }

        let barcode = null;
        if (req.body.barcode === "") {
            barcode = null
        } else {
            let isValidBarcode = await items.findAll({
                where: { barcode: req.body.barcode }
            });

            if (isValidBarcode.length >= 1) {
                return res.status(400).send({
                    message: "Duplicate barcode"
                })
            };
        }


        await items.create({
            code: req.body.code,
            name: req.body.name,
            active: req.body.active,
            image: image,
            openPrice: req.body.openPrice,
            price1: req.body.price1,
            price2: req.body.price2,
            price3: req.body.price3,
            purchased: req.body.purchased,
            purchasedToInventoryConversion: req.body.purchasedToInventoryConversion,
            purchasePrice: req.body.purchasePrice,
            purchaseUom: req.body.purchaseUom,
            recipeUom: req.body.recipeUom,
            averageCost: req.body.averageCost,
            barcode: barcode,
            serviceCharge: req.body.serviceCharge,
            tax: req.body.tax,
            category_id: req.body.category_id,
            salesWarehouse_id: req.body.salesWarehouse_id
        });
        res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.getAllItem = async (req, res) => {
    try {
        let getItem = await items.findAll();
        return res.status(200).send({
            message: "Retrieve success",
            data: getItem
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get item list",
            data: null
        });
    }
};

exports.deleteItem = async (req, res) => {
    let isValidItem = await items.findAll({
        where: { id: req.params.id }
    });

    if (isValidItem.length < 1) {
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let deleted = items.destroy({
            where: { id: req.params.id }
        });

        return res.status(200).send({
            message: "Item deleted"
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while deleting item",
            data: null
        });
    };
};

exports.updateItem = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: errors.errors[0].msg
        });
    }

    let isValidItem = await items.findAll({
        where: { id: req.body.id }
    });

    if (isValidItem.length < 1) {
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let image = null
        if (!req.file) {
            image = null
        } else {
            image = req.file.path
            const size = req.file.size;
            if (size > 2000000) {
                return res.status(413).send({
                    message: "Max size 2MB"
                })
            }
        }

        let barcode = null;
        if (req.body.barcode === "") {
            barcode = null
        } else {
            let isValidBarcode = await items.findAll({
                where: { barcode: req.body.barcode }
            });

            if (isValidBarcode.length >= 1) {
                return res.status(400).send({
                    message: "Duplicate barcode"
                })
            };
        }

        await items.update({
            code: req.body.code,
            name: req.body.name,
            active: req.body.active,
            image: image,
            openPrice: req.body.openPrice,
            price1: req.body.price1,
            price2: req.body.price2,
            price3: req.body.price3,
            purchased: req.body.purchased,
            purchasedToInventoryConversion: req.body.purchasedToInventoryConversion,
            purchasePrice: req.body.purchasePrice,
            purchaseUom: req.body.purchaseUom,
            recipeUom: req.body.recipeUom,
            averageCost: req.body.averageCost,
            barcode: barcode,
            serviceCharge: req.body.serviceCharge,
            tax: req.body.tax,
            category_id: req.body.category_id,
            salesWarehouse_id: req.body.salesWarehouse_id
        }, {
            where : {id: req.body.id}
        });

        return res.status(201).send({
            message: "Item updated"
        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while updating Item",
            data: null
        });
    };
}