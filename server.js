const path = require('path');
const express = require('express');
const app = express();
require('./common.middlewares').addCommonMiddlewares(app);
require('./config/passport.config').init();
const fs = require('fs');
const http = require('http');
const https = require('https');

const protocols = require('./config/protocols.config');
const httpsOptions = {
	key: fs.readFileSync('./cert/webbeast.key'),
	cert: fs.readFileSync('./cert/webbeast.crt'),

	// This is necessary only if using the client certificate authentication.
	// requestCert: true,

	// This is necessary only if the client uses the self-signed certificate.
	ca: [ fs.readFileSync('./cert/webbeast.crt') ]
};

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

http.createServer(app).listen(protocols.httpPort,
	() => console.log(`http on port ${protocols.httpPort}`));
https.createServer(httpsOptions, app).listen(protocols.httpsPort,
	() => console.log(`http on port ${protocols.httpsPort}`));