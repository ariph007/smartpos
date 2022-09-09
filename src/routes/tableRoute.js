const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');
const tableController = require('../controllers/tableController');


// router.post('/' ,tableController.createTable);
router.post('/', authorization.verifyToken, authorization.verifyRole,validator.createTableValidator ,tableController.createTable);
router.put('/', authorization.verifyToken, authorization.verifyRole,validator.createTableValidator ,tableController.updateTable);
router.delete('/:id', authorization.verifyToken, authorization.verifyRole ,tableController.deleteTable);
router.get('/', authorization.verifyToken, authorization.verifyRole ,tableController.getAllTable);

module.exports = router