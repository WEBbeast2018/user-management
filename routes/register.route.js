const path = require('path');
const router = require('express').Router();
const dataService = require('../data.service');

router.route('/')
	.get((req, res) => {
		res.sendFile(path.join(__dirname, '../public/register.html'));
		// console.log(__dirname)
		// res.sendFile('register.html', { root: path.join(process.cwd(), '/public') });
	})
	.post((req, res) => {
		const newUser = {
			email: req.body['email'],
			password: req.body['psw']
		};

		dataService.readJson('users', (users) => {
			users.push(newUser);
			dataService.writeJson('users', users, () => res.redirect('/home'));
		});
	});

module.exports = router;
