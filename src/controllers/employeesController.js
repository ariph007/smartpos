const {employees} = require('../models');
const bcrypt = require('bcryptjs')

exports.getDetailEmployee = async (req, res) => {
    try {
        let getEmployee = await employees.findOne({
            where: {id: req.employee.id}
        })

        return res.status(200).send({
            message : "Retrieve success",
            data: {
                id: getEmployee.dataValues.id,
                name: getEmployee.dataValues.name,
                jobTitle: getEmployee.dataValues.jobTitle,
                joined: getEmployee.dataValues.joined,
                email: getEmployee.dataValues.email,
                role: getEmployee.dataValues.role
            }
        })
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get detail employee",
            data: null
        })
    }
};

exports.getAllEmployee = async (req, res) => {
    try {
        let getEmployees = await employees.findAll();
        return res.status(200).send({
            message: "Retrieve success",
            data: getEmployees
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get all employee",
            data: null
        })
    }
};

exports.updateEmployee = async (req, res) => {
    console.log(req.params.id)
    try {
        const {active, jobTitle, joined, name, email, password, role} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        let update = await employees.update({
            active: active,
            jobTitle: jobTitle,
            joined: joined,
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        },{
            where: {id: req.body.id}
        });

        let getEmployee = await employees.findOne({
            where : {id: req.body.id}
        });

        return res.status(201).send({
            message: "Employee updated",
            data: getEmployee.dataValues
        });

    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message,
            data: null
        })
    }
};
