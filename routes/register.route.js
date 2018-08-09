const path = require('path');
const router = require('express').Router();
const dataService = require('../data.service');
const { body, validationResult } = require('express-validator/check');

const newUserValidation = [
	// username must be an email
	body('email').isEmail().withMessage('must be a valid e-mail'),
	// password must be at least 5 chars long
	body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
	// password must include 1 lowercase character, 1 uppercase character and a number
	body('password')
		.matches('[0-9]').withMessage('must include a number')
		.matches('[a-z]').withMessage('must include 1 lowercase character')
		.matches('[A-Z]').withMessage('must include 1 uppercase character'),
	// password  must match
	body('password-repeat').custom( (value, {req}) =>
			(value === req.body['password']) ? value : false
		).withMessage("passwords don't match."),
];

function getValidationErrorMessage(errors) {
	const errorsMessages = errors.array().map(err => `${err.param} :  ${err.msg}`);
	return errorsMessages.join(',')
}

router.route('/')
	.get((req, res) => {
		res.sendFile(path.join(__dirname, '../public/register.html'));
	})
	.post(newUserValidation, (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.sendFile(path.join(__dirname, '../public/register.html'));
			return res.redirect('?errors=' + getValidationErrorMessage(errors));
		}

		const newUser = {
			email: req.body['email'],
			password: req.body['password']
		};

		dataService.readJson('users', (users) => {
			users.push(newUser);
			dataService.writeJson('users', users, () => res.redirect('/home'));
		});
	});

module.exports = router;
