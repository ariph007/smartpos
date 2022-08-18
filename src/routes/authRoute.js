const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const validator = require('../middlewares/validator')

router.post('/register', validator.registerValidator, authController.register);
router.post('/login', validator.loginValidator ,authController.login);

module.exports = router;