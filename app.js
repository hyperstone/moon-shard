// require modules
var express = require('express');
var log = require('compact-log');
var fs = require('fs');

// setup compact-log
var log = new log({
	path: __dirname + '/log',
	levelmode: 'smartnobrackets'
});

// get config
var config = json.parse(fs.readfilesync('./config.json', 'utf8'));

// export
module.exports = {
	log: log,
	root: __dirname,
	config: config
};

// express
var app = express();

// http(s) server
var server = require('./modules/server.js');
server.init(app);

// initialize socket.io
var sio = require('./modules/socket.js');
sio.init(server.getservers());
