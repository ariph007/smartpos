const {payment_methods} = require('../models');
const {validationResult} = require('express-validator');

exports.createPaymentMethod = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	};

    try {
        await payment_methods.create(req.body);
        res.status(200).send({
            message: "Payment method created"
        })
    } catch (error) {
        res.status(500).send({
            message : error.message || "Something went wrong while create new payment method"
        });
    };
};

exports.getAllPayementMethod = async (req, res) => {
    try {
        let getPayment = await payment_methods.findAll();

        return res.status(200).send({
            message: "Retrieve success",
            data : getPayment
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get payment list",
            data : null
        });
    };
};

exports.updatePaymentMehod = async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}

    let isValidPaymentMehod = await payment_methods.findAll({
        where: {id : req.body.id}
    });

    if(isValidPaymentMehod.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        const {id, active, additionalCharge, noSales, noTax, noServiceCharge, type, name} = req.body;
        let update = await payment_methods.update({
            active: active,
            additionalCharge : additionalCharge,
            noSales: noSales,
            noTax : noTax,
            noServiceCharge: noServiceCharge,
            type: type,
            name: name
        },{
            where : {id: id}
        });

        return res.status(201).send({
            message: "Payment method updated"
        })
    } catch (error) {
        return res.status(500).send({
            code : 500,
            status: false,
            message: error.message || "Something went wrong while updating payment method",
            data: null
        });
    };
};

exports.deletePaymentMethod = async (req, res) => {
    let isValidPaymentMethod = await payment_methods.findAll({
        where: {id : req.params.id}
    });

    if(isValidPaymentMethod.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let deleted = payment_methods.destroy({
            where: {id: req.params.id}
        });

        return res.status(200).send({
            message: "Payment method deleted"
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while deleting payment method",
            data: null
        });
    };
};