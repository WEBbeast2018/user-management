const path = require('path');
const express = require('express');
const app = express();

// json parser middleware
app.use(express.json());
// static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// static file routing
app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
	next();
});

app.get('/register', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'public/register.html'));
	next();
});

app.get('/login', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'public/login.html'));
	next();
});


app.listen(3000,
	() => console.log('server listening on port 3000')
);