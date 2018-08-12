const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FileStore = require('session-file-store')(session);

module.exports.addCommonMiddlewares = (app) => {
	// json parser middleware
	app.use(express.json());
	// urlencoded parser middleware
	app.use(express.urlencoded({ extended: true }));
	// cookie parser middleware
	app.use(cookieParser());
	// session middleware - do not create before login. do not save if nothing has changed
	app.use(session({
		secret:  'replace me on production',
		resave: false,
		saveUninitialized: false,
		store: new FileStore
	}));
	// passport init and session
	app.use(passport.initialize());
	app.use(passport.session());
	// log middleware
	app.use(function (req, res, next) {
		console.log(`request url: ${req.url} | user: ${JSON.stringify(req.user)} | authenticate: ${req.isAuthenticated()}`);
		next()
	});
};

module.exports.authenticationMiddleware = () =>{
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status(403).redirect('/login')
		}
	}
};