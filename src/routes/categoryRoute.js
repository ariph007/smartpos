const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/create', authorization.verifyToken, authorization.verifyRole,validator.createCategoryValidator , categoryController.createCategory);
router.put('/update', authorization.verifyToken, authorization.verifyRole,validator.createCategoryValidator ,categoryController.updateCategory);
router.delete('/delete/:id', authorization.verifyToken, authorization.verifyRole ,categoryController.deleteCategory);
router.get('/list', authorization.verifyToken, authorization.verifyRole ,categoryController.getAllCategory);

module.exports = router