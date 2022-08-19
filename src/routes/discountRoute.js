const express = require('express');
const router = express.Router();
const discountCountroller = require('../controllers/discountController');
const authorization = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

router.post('/create', authorization.verifyToken, authorization.verifyRole,validator.createDiscountValidator , discountCountroller.createDiscount);
router.put('/update', authorization.verifyToken, authorization.verifyRole,discountCountroller.updateDiscount);
router.delete('/delete/:id', authorization.verifyToken, authorization.verifyRole , discountCountroller.deleteDiscount);
router.get('/list', authorization.verifyToken, authorization.verifyRole ,discountCountroller.getAllDiscount);

module.exports = router