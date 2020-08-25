const fs = require('fs');

module.exports = {
	method: 'post',
	path: '/:user/:channel',
	async execute(req, res) {
		const path = `user/archives/users/${req.params.user}/${req.params.channel}.json`;

		if (!req.query.key || req.query.key !== process.env.KEY)
			return res.status(401).send({
				status: 401,
				message: 'Unauthorised'
			});

		if (!req.body)
			return res.status(400).send({
				status: 400,
				message: 'Bad Request'
			});
		
		let HOST = process.env.HOST;
		if (HOST[HOST.length - 1] === '/')
			HOST = HOST.slice(0, -1);

		fs.writeFileSync(path, JSON.stringify(req.body));

		res.status(200).send({
			status: 200,
			message: 'OK',
			protocol: req.protocol,
			method: req.method,
			url: `${HOST}/${req.params.user}/${req.params.channel}`
		});
	}
};