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