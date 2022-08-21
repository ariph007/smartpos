const {settings} = require('../models');
const  {validationResult} = require('express-validator');

exports.createSetting = async ( req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}
    try {
        await settings.create(req.body);
        res.status(200).send({
            message: "Setting created"
        })
    } catch (error) {
        res.status(500).send({
            message : error.message || "Something went wrong while create new setting"
        });
    };
};

exports.getSetting = async (req, res) => {
    try {
        let getSalesSetting = await settings.findAll();

        return res.status(200).send({
            message: "Retrieve success",
            data : getSalesSetting
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get sales setting",
            data : null
        });
    };
};

exports.updateSetting = async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}

    let isValidSetting = await settings.findAll({
        where: {id : req.body.id}
    });

    if(isValidSetting.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        const {id, companyName, address, logo, phone, rounding, serviceChargeRate, taxRate} = req.body;
        let update = await settings.update({
            companyName : companyName,
            address : address,
            logo: logo,
            phone: phone,
            rounding: rounding,
            serviceChargeRate: serviceChargeRate,
            taxRate: taxRate
        },{
            where : {id: id}
        });

        return res.status(201).send({
            message: "Setting updated"
        })
    } catch (error) {
        return res.status(500).send({
            code : 500,
            status: false,
            message: error.message || "Something went wrong while updating category",
            data: null
        });
    };
};
