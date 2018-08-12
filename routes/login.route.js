const path = require('path');
const router = require('express').Router();
const dataService = require('../data.service');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  {
    usernameField: 'email', // use email field send from client as "username"
  },
  (email, password, done) => {
    // get user data from file
    dataService.readJson('users', (users) => {
      const user = users.find(u => u.email === email);
      if (!user) {
        // if no user found - login fail
        return done(null, false);
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res === true) {
          return done(null, {userId: user.id}); // login success
        } else {
          return done(null, false); // login fails - incorrect password
        }
      })
    });
  }
));

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/login?errors=bad username or password',
    successRedirect: '/home'
  }));

module.exports = router;
