const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/', authorization.verifyToken, authorization.verifyRole, validator.createStockValidator, stockController.createStock);
router.put('/', authorization.verifyToken, authorization.verifyRole,validator.createStockValidator ,stockController.updateStock);
router.delete('/:item_id', authorization.verifyToken, authorization.verifyRole ,stockController.deleteStock);
router.get('/', authorization.verifyToken, authorization.verifyRole ,stockController.getAllStock);
// router.get('/detail', authorization.verifyToken, authorization.verifyRole ,itemController.getDetailItem);

module.exports = router