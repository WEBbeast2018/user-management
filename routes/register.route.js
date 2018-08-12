const path = require('path');
const router = require('express').Router();
const dataService = require('../data.service');

router.route('/')
	.get((req, res) => {
		res.sendFile(path.join(__dirname, '../public/register.html'));
	})
	.post((req, res) => {
		const newUser = {
			email: req.body['email'],
			password: req.body['password']
		};

		dataService.readJson('users', (users) => {
      const userExist = users.find(u => u.email === newUser.email);
			if(userExist) {
        res.redirect('/register?errors=user already exists');
      } else {
        users.push(newUser);
        dataService.writeJson('users', users, () => res.redirect('/home'));
			}
		});
	});

module.exports = router;
