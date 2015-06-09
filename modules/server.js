// require external
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

// require internal
var config = require('./config');
var session = require('./sessions').session;

// set up log
var log = require('./log').createNamespace({
	name: 'HTTP',
	colors: ['bgYellow', 'black']
});

// import from main module
var root = process.mainModule.exports.root;

// declare global variables
var httpServer, httpsServer;

function init (app) {
	// static files
	app.use(express.static(root + '/static'));

	// session
	app.use(session);

	// http
	httpServer = http.createServer(app).listen(config.http.port, function () {
		log.info('HTTP is running on port ' + config.http.port);
	});

	// redirect https to http
	httpsServer = https.createServer({
		key: fs.readFileSync(root + '/ssl/private.key', 'utf8'),
		cert: fs.readFileSync(root + '/ssl/certificate.crt', 'utf8')
	}, app).listen(config.https.port, function () {
		log.info('HTTPS is running on port ' + config.https.port);
	});
}

// export
module.exports = {
	init: init,
	getServers: function () {
		return [httpServer, httpsServer];
	}
};
