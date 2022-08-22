const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/create', authorization.verifyToken, authorization.verifyRole, validator.createStockValidator, stockController.createStock);
router.put('/update', authorization.verifyToken, authorization.verifyRole,validator.createStockValidator ,stockController.updateStock);
router.delete('/delete/:item_id', authorization.verifyToken, authorization.verifyRole ,stockController.deleteStock);
router.get('/list', authorization.verifyToken, authorization.verifyRole ,stockController.getAllStock);
// router.get('/detail', authorization.verifyToken, authorization.verifyRole ,itemController.getDetailItem);

module.exports = router