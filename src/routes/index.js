/**
 * 
 *  @name DiscordTickets-Portal
 *  @author eartharoid <contact@eartharoid.me>
 *  @license OSL-3.0
 * 
 */

module.exports = {
	method: 'get',
	path: '/',
	execute(req, res) {
		res.status(200).send({
			status: 200,
			message: 'OK'
		});
	}
};