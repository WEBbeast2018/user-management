const path = require('path');
const router = require('express').Router();
const dataService = require('../data.service');
const {body, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');
const bcryptConfig = require('../config/bcrypt.config');

const newUserValidation = [
	// username must be an email
	body('email').isEmail().withMessage('must be a valid e-mail').normalizeEmail(),
	// password must be at least 5 chars long
	body('password').isLength({min: 5}).withMessage('must be at least 5 chars long'),
	// password must include 1 lowercase character, 1 uppercase character and a number
	body('password')
		.matches('[0-9]').withMessage('must include a number')
		.matches('[a-z]').withMessage('must include 1 lowercase character')
		.matches('[A-Z]').withMessage('must include 1 uppercase character'),
	// password  must match
	body('password-repeat').custom((value, {req}) =>
		(value === req.body['password']) ? value : false
	).withMessage("passwords don't match."),
];

// extract error string from express-validator
function getValidationErrorMessage(errors) {
	const errorsMessages = errors.array().map(err => `${err.param} :  ${err.msg}`);
	return errorsMessages.join(',')
}

// extract send registry form with error messages
function sendErrorResponse(res, errorString) {
	res.sendFile(path.join(__dirname, '../public/register.html'));
	return res.redirect('?errors=' + errorString);
}

router.route('/')
	.get((req, res) => {
		res.sendFile(path.join(__dirname, '../public/register.html'));
	})
	.post(newUserValidation, (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			sendErrorResponse(res, getValidationErrorMessage(errors));
		}

		const newUser = {
			email: req.body['email'],
			password: req.body['password']
		};
		// hash password and save
		bcrypt.hash(newUser.password, bcryptConfig.saltRounds, (err, hash) => {
			newUser.password = hash;
			dataService.readJson('users', (users) => {
				if (users.find(u => u.email === newUser.email)) {
					sendErrorResponse(res, 'user with this email already exist');
				} else {
					newUser.id = users.length +1;
					users.push(newUser);
					dataService.writeJson('users', users, () => {
						req.login(newUser.email, (err) => {
							if (err) {
								console.error(err);
								sendErrorResponse(res, 'unknown error when login new user');
							} else {
								res.redirect('/home');
							}
						});
					});
				}
			});
		});
	});

module.exports = router;
