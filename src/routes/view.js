const markdown = require('../markdown');
const Formatter = require('../formatter');
const fs = require('fs');

module.exports = {
	method: 'get',
	path: '/:user/:channel',
	async execute(req, res) {
		const path = `user/archives/users/${req.params.user}/${req.params.channel}.json`;

		if(!fs.existsSync(path))
			return res.status(404).send({status: 404, message: 'Not found'});
		
		const fm = new Formatter(require(fs.readFileSync(path)));
		const data = await fm.format();
		res.render('channel', {
			data: data,
			markdown,
			hostname: `http://${req.hostname}`,
			title: process.env.NAME
		});
	}
};