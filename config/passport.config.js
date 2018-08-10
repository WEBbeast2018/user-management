const passport = require('passport');

module.exports.init = () => {
	passport.serializeUser((userId, done) => {
		done(null, userId);
	});

	passport.deserializeUser((userId, done) => {
			done(null, userId);
	});
};
