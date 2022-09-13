const express = require('express');
const router = express.Router();
const salesLinesController = require('../controllers/salesLinesController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.get('/', authorization.verifyToken, authorization.verifyRole ,salesLinesController.getSalesLinesBySalesId);

module.exports = router