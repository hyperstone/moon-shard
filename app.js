// require external
var express = require('express');
var fs = require('fs');


// export
module.exports = {
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
