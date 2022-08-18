const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {employees} = require('../models');
const { validationResult } = require('express-validator');


exports.register = async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
            message: errors.errors[0].msg
        });
	}
    try {
        const {active, jobTitle, joined, name, password,email, role} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        let checkEmail = await employees.findAll({
            where: {email: email}
        })

        if(checkEmail.length > 0){
            return res.status(400).send({
                message: "Email has already been registered"
            })
        };

        let insertEmployee = await employees.create({
            active: active,
            jobTitle: jobTitle,
            joined: joined,
            name: name,
            password: hashedPassword,
            email: email,
            role: role
        });

        return res.status(201).send({
            message: "Register Success"
        })
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while trying register employee",
            data: "null"
        })
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            message: errors.errors[0].msg
        })
    }

    let checkEmail = await employees.findAll({
        where: {email: req.body.email}
    })

    if(checkEmail.length <= 0){
        return res.status(400).send({
            message: "Email not found on database"
        })
    };
    try {
        let getEmployee = await employees.findOne({
            where: {email : req.body.email}
        });

        const isPasswordValid = bcrypt.compareSync(req.body.password, getEmployee.dataValues.password)

        if(!isPasswordValid){
            return res.status(400).send({
                message: "Password invalid"
            });
        };

        const token = jwt.sign({
            id: getEmployee.dataValues.id,
            jobTitle: getEmployee.dataValues.jobTitle,
            name: getEmployee.dataValues.name,
            email: getEmployee.dataValues.email,
            role: getEmployee.dataValues.role,
        }, process.env.JWT_KEY, {expiresIn: 3600});

        return res.status(200).send({
            message: "Login Successfull",
            token: token
        });

    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message,
            data: null
        })
    }
}