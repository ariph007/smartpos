const {sales_lines} = require('../models');
const {validationResult} = require('express-validator');

exports.getSalesLinesBySalesId = async (req, res) => {
    try {
        let salesLines = await sales_lines.findAll({
            where: {
                sales_id : req.body.sales_id
            }
        });

        return res.status(200).send({
            message: "Retrieve success",
            data: salesLines
        })
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get sales list",
            data : null
        })
    }
}