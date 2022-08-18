const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');
const authorization = require("../middlewares/authorization");

router.get('/me', authorization.verifyToken, employeesController.getDetailEmployee);
router.get('/all', authorization.verifyToken, authorization.verifyRole ,employeesController.getAllEmployee);
router.put('/update', authorization.verifyToken,authorization.verifyRole ,employeesController.updateEmployee);

module.exports = router