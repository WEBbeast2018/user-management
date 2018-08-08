const path = require('path');
const express = require('express');
const app = express();
require('./common.middlewares').addCommonMiddlewares(app);
const dataService = require('./data.service');

dataService.readJson('users', (data) => {
  console.log('Ta da!');
  console.log(data)
});

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.listen(3000,
	() => console.log('server listening on port 3000')
);