// require modules
var express = require('express');
var Log = require('compact-log');
var fs = require('fs');

// setup compact-log
var log = new Log({
  path: __dirname + '/log',
  levelMode: 'smartNoBrackets'
});

// get config
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

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
sio.init(server.getServers());
