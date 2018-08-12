const path = require('path');
const express = require('express');
const app = express();
require('./common.middlewares').addCommonMiddlewares(app);
require('./config/passport.config').init();


// routes
app.use('/register', require('./routes/register.route'));
app.use('/posts', require('./routes/posts.route'));
app.use('/login', require('./routes/login.route'));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/home');
});

app.listen(3000,
  () => console.log('server listening on port 3000')
);