const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator')


// router.post('/create', authorization.verifyToken, authorization.verifyRole,validator.createDepartmentValidator ,departmentController.createDepartment);
router.post('/' ,departmentController.createDepartment);
router.put('/', authorization.verifyToken, authorization.verifyRole,validator.createDepartmentValidator ,departmentController.updateDepartment);
router.delete('/:id', authorization.verifyToken, authorization.verifyRole ,departmentController.deleteDepartment);
router.get('/', authorization.verifyToken, authorization.verifyRole ,departmentController.getAllDepartment);

module.exports = router