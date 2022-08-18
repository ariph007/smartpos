const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');
const authorization = require("../middlewares/authorization");

router.get('/me', authorization.verifyToken, employeesController.getDetailEmployee);

module.exports = router