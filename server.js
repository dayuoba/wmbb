var express = require('express');
var http = require('http');
var _ = require('lodash');
var app = express();

var server = http.Server(app);

var rejectRoutes = [
	'components/',
	'config/',
	'hackLibs/',
	'models/',
	'utils/',
	'views/',
	'app.js',
	'application.js',
];
var port = 2208;

_.each(rejectRoutes, function(route) {
	app.use('/lib/' + route, function(req, res) {
		res.sendStatus(403);
	});
});

app.use(express.static(__dirname));

server.listen(port, function() {
	console.log(
		`
		server started...
		listening on ${port}
		`
		);
});