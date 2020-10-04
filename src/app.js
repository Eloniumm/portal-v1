/**
 * 
 *  @name DiscordTickets-Portal
 *  @author eartharoid <contact@eartharoid.me>
 *  @license OSL-3.0
 * 
 */

const path = require('path');
const fs = require('fs');
const express = require('express');

const Logger = require('leekslazylogger-express');
const log = new Logger();

const app = express();

app.use(log.express);

// view engine setup
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.routes =  [];
const routes_dir = fs.readdirSync('src/routes').filter(file => file.endsWith('.js'));
for (const file of routes_dir) {
	const route = require(`./routes/${file}`);
	app.routes.push(route);
	app[route.method](route.path, (req, res) => route.execute(req, res));
	log.console(log.f(`> Loaded ${route.method.toUpperCase()} '&7${route.path}&f' route`));
}


app.use((req, res) => {
	res.status(404).send({
		status: 404,
		message: `${req.originalUrl} doesn't exist.`
	});
});

// // error handler
// app.use((err, req, res) => {
// 	res.locals.message = err.message;
// 	res.locals.error = err;
	
// 	res.status(err.status || 500);
// 	res.render('error');
// });

if (process.env.KEEP_FOR) {
	const one_hour = 1000 * 60 * 60;
	const clearTemp = () => {
		let deleted = 0;
		log.info('Scanning for old archives');
		fs.readdirSync('user/archives/users/', { withFileTypes: true })
			.filter(dir => dir.isDirectory())
			.map(dir => dir.name).forEach(user => {
				const channels = fs.readdirSync('user/archives/users/' + user);
				let today = new Date();

				for (const file of channels) { 
					let path = `user/archives/users/${user}/${file}`;
					let lastMod = new Date(fs.statSync(path).mtime);
					let max = one_hour * 24 * process.env.KEEP_FOR;
					if (Math.floor((today - lastMod) / max) > 1) {
						fs.unlinkSync(path);
						log.console(`Removed ${file}`);
						deleted++;
					}
				}
				log.info(`Removed ${deleted} old archives`);
			});
	};
	clearTemp();
	setInterval(clearTemp, one_hour * 24);
}

module.exports = app;
