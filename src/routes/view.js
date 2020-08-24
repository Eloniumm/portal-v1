const ChildLogger = require('leekslazylogger').ChildLogger;
const log = new ChildLogger();

const markdown = require('../markdown');
const Formatter = require('../formatter');
const fs = require('fs');
const ejs = require('ejs');
const { minify } = require('html-minifier');

module.exports = {
	method: 'get',
	path: '/:user/:channel',
	async execute(req, res) {
		const path = `user/archives/users/${req.params.user}/${req.params.channel}.json`;

		if(!fs.existsSync(path))
			return res.status(404).send({status: 404, message: 'Not found'});
		
		const fm = new Formatter(require('../../' + path));
		const data = await fm.format();
		if (!data || data === null) 
			return res.status(400).send({status: 400, message: 'Bad Request'});

		let payload = {
			data: data,
			markdown,
			hostname: `http://${req.hostname}`,
			title: process.env.NAME,
			time: fs.statSync(path).mtime
		};
		
		// ejs.renderFile('src/views/channel.ejs', payload, null, (err, str) => {
		// 	if (err) {
		// 		res.status(500).send({status: 500, message: 'Internal Server Error', error: err});
		// 		return log.error(err);
		// 	}
		// 	res.send(minify(str, {
		// 		collapseWhitespace: true,
		// 		removeComments: true
		// 	}));
		// });

		res.render('channel', payload);
	}
};