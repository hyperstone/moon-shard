// require external
var Log = require('compact-log');

// require internal
var config = require('./config');

// set up compact-log
var log = new Log({
	path: process.mainModule.__dirname + config.log.path,
	levelmode: config.log.levelmode
});

// export log
module.exports = log;
