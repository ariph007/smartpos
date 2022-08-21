const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const validator = require('../middlewares/validator');
const authorization = require('../middlewares/authorization');

router.post('/create', authorization.verifyToken, authorization.verifyRole,validator.createSettingValidator , settingController.createSetting);
router.put('/update', authorization.verifyToken, authorization.verifyRole,validator.createSettingValidator , settingController.updateSetting);
router.get('/', authorization.verifyToken, authorization.verifyRole ,settingController.getSetting);

module.exports = router