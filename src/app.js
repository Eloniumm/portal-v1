const path = require('path');
const fs = require('fs');
const express = require('express');

const ChildLogger = require('leekslazylogger').ChildLogger;
const log = new ChildLogger();

const app = express();

app.use(require('leekslazylogger-express'));

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

module.exports = app;