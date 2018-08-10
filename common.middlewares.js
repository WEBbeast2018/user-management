const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

module.exports.addCommonMiddlewares = (app) => {
	// json log middleware
	app.use(function (req, res, next) {
		console.log(`request url: ${req.url}`);
		next()
	});
	// json parser middleware
	app.use(express.json());
	// urlencoded parser middleware
	app.use(express.urlencoded({ extended: true }));
	// cookie parser middleware
	app.use(cookieParser());
	// session middleware - do not create before login. do not save if nothing has changed
	app.use(session({
		secret:  Math.random().toString(15).substr(2),
		resave: false,
		saveUninitialized: false,
	}));
	// passport init and session
	app.use(passport.initialize());
	app.use(passport.session());
};