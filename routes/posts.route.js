const router = require('express').Router();
const dataService = require('../data.service');
const authenticationMiddleware = require('../common.middlewares').authenticationMiddleware;

router.route('/')
	.get(authenticationMiddleware(), (req, res) => {
		dataService.readJson('posts', (posts, err) => {
			if(err) {
				res.status(500).end('error reading data');
			} else {
				res.json(posts);
			}
		});
	});

module.exports = router;
