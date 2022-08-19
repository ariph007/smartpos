const {check} = require('express-validator');

exports.registerValidator = [
    check('name', 'Name can not be empty or minimum length 2').isLength({min:2}),
    check('jobTitle', 'Job title can not be empty').not().isEmpty(),
    check('joined', 'Join date can not be empty').not().isEmpty(),
    check('active', 'Active can not be empty').not().isEmpty(),
	check('email', 'Invalid email').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password minimun 6 character').not().isEmpty().isLength({ min: 6, max:6 }),
    check('role').isIn(['cashier', 'manager']).withMessage('Invalid role')

]

exports.loginValidator = [
	check('email', 'Email cannot be empty').not().isEmpty(),
    check('password', 'Invalid password').not().isEmpty()
];

exports.createDepartmentValidator = [
	check('code', 'Code cannot be empty').not().isEmpty(),
    check('name', 'Name cannot be empty').not().isEmpty()
];

exports.createCategoryValidator = [
	check('code', 'Code cannot be empty').not().isEmpty(),
    check('name', 'Name cannot be empty').not().isEmpty(),
    check('department_id', 'Department ID cannot be empty').not().isEmpty()
];

exports.createPaymentMethodValidator = [
	check('type', 'Code cannot be empty').not().isEmpty(),
    check('name', 'Name cannot be empty').not().isEmpty(),
];

exports.createDiscountValidator = [
	check('active', 'Code cannot be empty').not().isEmpty(),
    check('name', 'Name cannot be empty').not().isEmpty(),
    check('amount', 'Amount cannot be empty').not().isEmpty()
];

exports.createWarehouseValidator = [
	check('code', 'Code cannot be empty').not().isEmpty(),
    check('name', 'Name cannot be empty').not().isEmpty(),
];