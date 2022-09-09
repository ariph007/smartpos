const {discounts} = require('../models');
const {validationResult} = require('express-validator');

exports.createDiscount = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            message: errors.errors[0].msg
        });
    };

    try {
        await discounts.create(req.body);
        res.status(200).send({
            message: "Discount created"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Something went wrong while creating discount"
        })
    }
};

exports.getAllDiscount = async (req, res) =>{
    try {
        let getDiscount = await discounts.findAll({
            where: {active: true}
        });
        return res.status(200).send({
            message: "Retrieve success",
            data: getDiscount
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get discount list",
            data : null
        });
    };
};

exports.updateDiscount = async (req, res) => {
    let isValidDiscount = await discounts.findAll({
        where: {id : req.body.id}
    });

    if(isValidDiscount.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };

    try {
        const {id, active,amount, name, value, department1_id, department2_id, department3_id, 
            category1_id, category2_id, category3_id, item1_id, item2_id, item3_id} = req.body;
        
        let update = await discounts.update({
            active: active,
            amount: amount,
            name: name,
            value: value,
            department1_id: department1_id,
            department2_id: department2_id,
            department3_id: department3_id,
            category1_id: category1_id,
            category2_id: category2_id,
            category3_id: category3_id,
            item1_id: item1_id,
            item2_id: item2_id,
            item3_id: item3_id
        },{
            where : {id:id}
        });

        return res.status(201).send({
            message: "Discount updated"
        });
    } catch (error) {
        return res.status(500).send({
            code : 500,
            status: false,
            message: error.message || "Something went wrong while updating discount",
            data: null
        });
    };
};

exports.deleteDiscount = async (req, res) => {
    let isValidDiscount = await discounts.findAll({
        where: {id : req.params.id}
    });

    if(isValidDiscount.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let deleted = discounts.destroy({
            where : {id : req.params.id}
        });
        return res.status(201).send({
            message: "Discount deleted"
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while deleting discount",
            data: null
        });
    };
};