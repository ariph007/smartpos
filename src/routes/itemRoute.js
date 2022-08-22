const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/', authorization.verifyToken, authorization.verifyRole, validator.createItemValidator, itemController.createItem);
router.put('/', authorization.verifyToken, authorization.verifyRole,validator.createItemValidator ,itemController.updateItem);
router.delete('/:id', authorization.verifyToken, authorization.verifyRole ,itemController.deleteItem);
router.get('/', authorization.verifyToken, authorization.verifyRole ,itemController.getAllItem);
router.get('/detail', authorization.verifyToken, authorization.verifyRole ,itemController.getDetailItem);

module.exports = router