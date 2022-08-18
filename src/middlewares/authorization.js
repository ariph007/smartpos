require('dotenv').config();

const jwt = require('jsonwebtoken');
const {employees} = require('../models');

exports.verifyToken = async (req, res, next) => {
    try {
        const jwtToken = req.headers['authorization'];
        if(!jwtToken){
            return res.status(403).send({
                message : "No JWT token provided"
            })
        }

        let verify = jwt.verify(jwtToken.split(" ")[1], process.env.JWT_KEY);
        if(!verify){
            return res.status(403).send({
                message: "Failed to authenticate JWT token"
            })
        }

        req.employee = verify;
        next();
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong when verify JWT token",
            data: null
        })
    }
}

exports.verifyRole = async (req, res, next) => {
    let isManager = await employees.findOne({
        where : {id : req.employee.id}
    });

    if(isManager.dataValues.role !== 'manager'){
        return res.status(403).send({
            message: "You re not authorized to access"
        })
    }
    next();
};
