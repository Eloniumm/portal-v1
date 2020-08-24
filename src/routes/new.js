const fs = require('fs');

module.exports = {
	method: 'post',
	path: '/:user/:channel',
	async execute(req, res) {
		const path = `user/archives/users/${req.params.user}/${req.params.channel}.json`;

		if(!req.query.key || req.query.key !== process.env.KEY)
			return res.status(401).send({status: 401, message: 'Unauthorised'});

		if(!req.body)
			return res.status(400).send({status: 400, message: 'Bad Request'});

		fs.writeFileSync(path, JSON.stringify(req.body));

		res.status(200).send({status: 200, message: 'OK'});
	}
};