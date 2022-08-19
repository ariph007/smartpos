const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/create', authorization.verifyToken, authorization.verifyRole,validator.createWarehouseValidator , warehouseController.createWarehouse);
router.put('/update', authorization.verifyToken, authorization.verifyRole,validator.createWarehouseValidator , warehouseController.updateWarehouse);
router.delete('/delete/:id', authorization.verifyToken, authorization.verifyRole ,warehouseController.deleteWarehouse);
router.get('/list', authorization.verifyToken, authorization.verifyRole ,warehouseController.getAllWarehouse);

module.exports = router