// require external
var Log = require('compact-log');
var path = require('path');

// require internal
var config = require('./config');

// set up compact-log
var log = new Log({
	path: path.join(__dirname, '..', config.log.path),
	levelmode: config.log.levelmode
});

// export log
module.exports = log;
