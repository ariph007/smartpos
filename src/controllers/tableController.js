const { validationResult } = require('express-validator');
const {tables} = require('../models');


exports.createTable = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            message: errors.errors[0].msg
        });
    }
    try {
        let insertTable = await tables.create(req.body);
        return res.status(200).send({
            message: insertTable
        })
    } catch (error) {
        res.status(500).send({
            message : error.message || "Something went wrong while create new table"
        });
    };
};

exports.getAllTable = async (req, res) => {
    try {
        let getTable = await tables.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        return res.status(200).send({
            message: "Retrieve success",
            data: getTable
        })
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get department list",
            data : null
        });
    };
};

exports.updateTable = async (req, res) => {
    const id = req.body.id;
    let isValiTable = await tables.findAll({
        where: {id : id}
    });

    if(isValiTable.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        const {name, capacity, height, width, x, y} = req.body;
        let update = await tables.update({
            name: name,
            capacity: capacity,
            height:  height,
            width: width,
            x: x,
            y: y
        },{
            where : {id: id}
        });

        return res.status(201).send({
            message: "Table updated"
        })
    } catch (error) {
        return res.status(500).send({
            code : 500,
            status: false,
            message: error.message || "Something went wrong while updating table",
            data: null
        });
    };
};

exports.deleteTable = async (req, res) => {
    let isValidTable = await tables.findAll({
        where: {id : req.params.id}
    });

    if(isValidTable.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let deleted = tables.destroy({
            where: {id: req.params.id}
        });

        return res.status(200).send({
            message: "Table deleted"
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while deleting table",
            data: null
        });
    };
};