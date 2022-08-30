const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/', authorization.verifyToken, authorization.verifyRole, validator.createItemValidator, itemController.createItem);
router.put('/', authorization.verifyToken, authorization.verifyRole,validator.createItemValidator ,itemController.updateItem);
router.delete('/:id', authorization.verifyToken, authorization.verifyRole ,itemController.deleteItem);
router.get('/category/:category_id', authorization.verifyToken, authorization.verifyRole ,itemController.getItemCategory);
router.get('/:keyword', authorization.verifyToken, authorization.verifyRole ,itemController.getSpecificItem);
router.get('/detail', authorization.verifyToken, authorization.verifyRole ,itemController.getDetailItem);

module.exports = router