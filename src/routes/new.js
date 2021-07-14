/**
 * 
 *  @name DiscordTickets-Portal
 *  @author eartharoid <contact@eartharoid.me>
 *  @license OSL-3.0
 * 
 */

const fs = require('fs');
const { join } = require('path');
const Formatter = require('../formatter');
var rimraf = require("rimraf");

module.exports = {
	method: 'post',
	path: '/:user/:channel',
	async execute(req, res) {
		const dir = join('user/archives/users', req.params.user);
		const path = join(dir, req.params.channel + '.json');

		let key = req.query.key;

		if (!key || key !== process.env.KEY)
			return res.status(401).send({
				status: 401,
				message: 'Unauthorised'
			});
		
		if (!req.body)
			return res.status(400).send({
				status: 400,
				message: 'Bad Request'
			});

		const fm = new Formatter(req.body, true);
		const data = await fm.format();
		if (!data || data === null)
			return res.status(400).send({
				status: 400,
				message: 'Bad Request'
			});

		
		let HOST = process.env.HOST;
		if (HOST[HOST.length - 1] === '/')
			HOST = HOST.slice(0, -1);

		if (!fs.existsSync(dir))
			fs.mkdirSync(dir);
		fs.writeFileSync(path, JSON.stringify(req.body));
setTimeout(async function() {
await fs.unlinkSync(path);
await fs.rmdirSync(dir);
}, 180000)
		res.status(200).send({
			status: 200,
			message: 'OK',
			protocol: req.protocol,
			method: req.method,
			url: `${HOST}/${req.params.user}/${req.params.channel}`
		});
	}
};