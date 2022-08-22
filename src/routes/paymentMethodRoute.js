const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentMethodController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/', authorization.verifyToken, authorization.verifyRole,validator.createPaymentMethodValidator , paymentMethodController.createPaymentMethod);
router.put('/', authorization.verifyToken, authorization.verifyRole,validator.createPaymentMethodValidator ,paymentMethodController.updatePaymentMehod);
router.delete('/:id', authorization.verifyToken, authorization.verifyRole ,paymentMethodController.deletePaymentMethod);
router.get('/', authorization.verifyToken, authorization.verifyRole ,paymentMethodController.getAllPayementMethod);

module.exports = router