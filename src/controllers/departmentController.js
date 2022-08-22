const {departments} = require('../models');
const { validationResult } = require('express-validator');


exports.createDepartment = async ( req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}
    try {
        let insertDepartment = await departments.create(req.body);
        res.status(200).send({
            message: insertDepartment
        })
    } catch (error) {
        res.status(500).send({
            message : error.message || "Something went wrong while create new department"
        })
    }
};

exports.getAllDepartment = async (req, res) => {
    try {
        let getDepartment = await departments.findAll();

        return res.status(200).send({
            message: "Retrieve success",
            data : getDepartment
        });

    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get department list",
            data : null
        })
    }
}

exports.updateDepartment = async (req, res) => {
    let isValidDepartment = await departments.findAll({
        where: {id : req.body.id}
    });

    if(isValidDepartment.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        const {code, name, id} = req.body;
        let update = await departments.update({
            code: code,
            name: name
        },{
            where : {id: id}
        });

        return res.status(201).send({
            message: "Department updated"
        })
    } catch (error) {
        return res.status(500).send({
            code : 500,
            status: false,
            message: error.message || "Something went wrong while updating department",
            data: null
        });
    };
};

exports.deleteDepartment = async (req, res) => {
    let isValidDepartment = await departments.findAll({
        where: {id : req.params.id}
    });

    if(isValidDepartment.length < 1){
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let deleted = departments.destroy({
            where: {id: req.params.id}
        });

        return res.status(200).send({
            message: "Department deleted"
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while deleting department",
            data: null
        });
    };
};