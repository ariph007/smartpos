const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/create', authorization.verifyToken, authorization.verifyRole, validator.createItemValidator, itemController.createItem);
router.put('/update', authorization.verifyToken, authorization.verifyRole,validator.createItemValidator ,itemController.updateItem);
router.delete('/delete/:id', authorization.verifyToken, authorization.verifyRole ,itemController.deleteItem);
router.get('/list', authorization.verifyToken, authorization.verifyRole ,itemController.getAllItem);

module.exports = router