const {warehouses} = require('../models');
const {validationResult} = require('express-validator');

exports.createWarehouse = async ( req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}
    try {
        await warehouses.create(req.body);
        res.status(200).send({
            message: "Warehouse created"
        })
    } catch (error) {
        res.status(500).send({
            message : error.message || "Something went wrong while create new warehouse"
        });
    };
};

exports.getAllWarehouse = async (req, res) => {
    try {
        let getWarehouse = await warehouses.findAll();

        return res.status(200).send({
            message: "Retrieve success",
            data : getWarehouse
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get warehouse list",
            data : null
        });
    };
};

exports.updateWarehouse = async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}

    let isValidWarehouse = await warehouses.findAll({
        where: {id : req.body.id}
    });

    if(isValidWarehouse.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        const {code, name, active, id} = req.body;
        let update = await warehouses.update({
            id: id,
            code: code,
            name: name,
            active: active
        },{
            where : {id: id}
        });

        return res.status(201).send({
            message: "Warehouse updated"
        })
    } catch (error) {
        return res.status(500).send({
            code : 500,
            status: false,
            message: error.message || "Something went wrong while updating warehouse",
            data: null
        });
    };
};

exports.deleteWarehouse = async (req, res) => {
    let isValidWarehouse = await warehouses.findAll({
        where: {id : req.params.id}
    });

    if(isValidWarehouse.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let deleted = warehouses.destroy({
            where: {id: req.params.id}
        });

        return res.status(200).send({
            message: "Warehouse deleted"
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while deleting warehouse",
            data: null
        });
    };
};