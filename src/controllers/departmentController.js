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
        await departments.create(req.body);
        res.status(200).send({
            message: "Department created"
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