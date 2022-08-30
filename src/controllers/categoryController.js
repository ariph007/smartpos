const { categories } = require('../models');
const { departments } = require('../models');
const { validationResult } = require('express-validator');
const { Op, where } = require('sequelize');

exports.createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: errors.errors[0].msg
        });
    }
    try {
        await categories.create(req.body);
        res.status(200).send({
            message: "Category created"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Something went wrong while create new category"
        })
    }
};

exports.getAllCategory = async (req, res) => {
    // console.log(req.body.active)
    try {
        let getCategory = await categories.findAll({
            include: [{
                model: departments,
                attributes: ['name'],
                where: {
                    name: {
                        [Op.in]: ['BEVERAGES', 'FOOD']
                    }
                }
            }],
            where: {
                active: {
                    [Op.eq]: true
                }
            }
        });

        // let getCategory = await categories.findAll({
        //     where: {
        //         active: {
        //             [Op.eq]: req.body.active
        //         }
        //     }
        // });

        return res.status(200).send({
            message: "Retrieve success",
            data: getCategory

        });
        console.log(getCategory)
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while get category list",
            data: null
        });
    };
};

exports.updateCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: errors.errors[0].msg
        });
    }

    let isValidCategory = await categories.findAll({
        where: { id: req.body.id }
    });

    if (isValidCategory.length < 1) {
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        const { code, name, id, department_id } = req.body;
        let update = await categories.update({
            code: code,
            name: name,
            department_id: department_id
        }, {
            where: { id: id }
        });

        return res.status(201).send({
            message: "Category updated"
        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while updating category",
            data: null
        });
    };
};

exports.deleteCategory = async (req, res) => {
    let isValidCategory = await categories.findAll({
        where: { id: req.params.id }
    });

    if (isValidCategory.length < 1) {
        return res.status(400).send({
            message: "Invalid id"
        })
    };
    try {
        let deleted = categories.destroy({
            where: { id: req.params.id }
        });

        return res.status(200).send({
            message: "Category deleted"
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message || "Something went wrong while deleting category",
            data: null
        });
    };
};