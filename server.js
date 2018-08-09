const path = require('path');
const express = require('express');
const app = express();
require('./common.middlewares').addCommonMiddlewares(app);

// routes
app.use('/register', require('./routes/register.route'));

// dataService.readJson('users', (data) => {
//   console.log('Ta da!');
//   console.log(data)
// });

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
//
// app.route('/register')
// 	.get((req, res) => {
// 		res.sendFile(path.join(__dirname, 'public/register.html'));
// 	})
// 	.post((req, res) => {
// 		const newUser = {
// 			email: req.body['email'],
// 			password: req.body['psw']
// 		};
//
// 		dataService.readJson('users', (users) => {
// 			users.push(newUser);
// 			dataService.writeJson('users', users, () => res.redirect('/home'));
// 		});
// 	});
//

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.listen(3000,
	() => console.log('server listening on port 3000')
);