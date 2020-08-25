const fs = require('fs');

module.exports = {
	method: 'get',
	path: '/:user/:channel.json',
	async execute(req, res) {
		const path = `user/archives/users/${req.params.user}/${req.params.channel}.json`;

		if (!fs.existsSync(path))
			return res.status(404).send({
				status: 404,
				message: 'Not found',
				error: {
					code: 404,
					message: 'Requested archive does not exist'
				}
			});


		res.send(JSON.parse(fs.readFileSync(path)));
		
	}
};