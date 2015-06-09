// require external
var express = require('express');

// require internal
var db = require('./modules/db');

// export
module.exports = {
	root: __dirname
};

// set up database
db.setup();

// express
var app = express();

// http(s) server
var server = require('./modules/server.js');
server.init(app);

// initialize socket.io
var sio = require('./modules/socket.js');
sio.init(server.getServers());
