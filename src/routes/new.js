const fs = require('fs');

module.exports = {
	method: 'post',
	path: '/:user/:channel',
	async execute(req, res) {
		const path = `user/archives/${req.params.user}/${req.params.channel}.json`;

		
	}
};