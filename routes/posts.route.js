const router = require('express').Router();
const dataService = require('../data.service');

router.route('/')
	.get((req, res) => {
		dataService.readJson('posts', (posts, err) => {
			if(err) {
				res.status(500).end('error reading data');
			} else {
				res.json(posts);
			}
		});
	});

module.exports = router;
