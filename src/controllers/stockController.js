const {stocks} = require('../models');
const  {validationResult} = require('express-validator');

exports.createStock = async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}
    try {
        await stocks.create(req.body);
        res.status(200).send({
            message: "Stocks created"
        })
    } catch (error) {
        res.status(500).send({
            message : error.message || "Something went wrong while create new stocks"
        });
    };
};

exports.getAllStock = async (req, res) => {
    try {
        let getStock = await stocks.findAll();

        return res.status(200).send({
            message: "Retrieve success",
            data : getStock
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get Stock list",
            data : null
        });
    };
};

exports.updateStock = async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}

    let isValidStock = await stocks.findAll({
        where: {item_id : req.body.item_id}
    });

    if(isValidStock.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        const {balance, warehouse_id, item_id} = req.body;
        let update = await stocks.update({
            balance: balance,
            warehouse_id: warehouse_id,
            item_id: item_id
        },{
            where : {item_id: item_id}
        });

        return res.status(201).send({
            message: "Stock updated"
        })
    } catch (error) {
        return res.status(500).send({
            code : 500,
            status: false,
            message: error.message || "Something went wrong while updating Stock",
            data: null
        });
    };
};

exports.deleteStock = async (req, res) => {
    let isValidStock = await stocks.findAll({
        where: {item_id : req.params.item_id}
    });

    if(isValidStock.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let deleted = stocks.destroy({
            where: {id: req.params.item_id}
        });

        return res.status(200).send({
            message: "Stock deleted"
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while deleting Stock",
            data: null
        });
    };
};