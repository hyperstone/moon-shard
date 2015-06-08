// require modules
var express = require('express');
var Log = require('compact-log');
var fs = require('fs');

// setup compact-log
var log = new Log({
	path: __dirname + '/log',
	levelmode: 'smartNoBrackets'
});

// export
module.exports = {
	log: log,
	root: __dirname
};

// express
var app = express();

// http(s) server
var server = require('./modules/server.js');
server.init(app);

// initialize socket.io
var sio = require('./modules/socket.js');
sio.init(server.getServers());
