const path = require('path');
const router = require('express').Router();
const dataService = require('../data.service');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
	},
	(username, password, done) => {
		console.log(username + "|" + password);
		return done(null, username);
	}
));

router.route('/')
	.get((req, res) => {
		res.sendFile(path.join(__dirname, '../public/login.html'));
	})
	.post(passport.authenticate('local', {
			failureRedirect: '/login',
			successRedirect: '/home'
		}));

module.exports = router;
