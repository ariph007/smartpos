const {employees} = require('../models');

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
}