const path = require('path');
const express = require('express');
const app = express();
require('./common.middlewares').addCommonMiddlewares(app);
require('./config/passport.config').init();


// routes
app.use('/register', require('./routes/register.route'));
app.use('/posts', require('./routes/posts.route'));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.listen(3000,
	() => console.log('server listening on port 3000')
);