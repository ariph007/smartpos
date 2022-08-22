const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/', authorization.verifyToken, authorization.verifyRole,validator.createCategoryValidator , categoryController.createCategory);
router.put('/', authorization.verifyToken, authorization.verifyRole,validator.createCategoryValidator ,categoryController.updateCategory);
router.delete('/delete/:id', authorization.verifyToken, authorization.verifyRole ,categoryController.deleteCategory);
router.get('/', authorization.verifyToken, authorization.verifyRole ,categoryController.getAllCategory);

module.exports = router