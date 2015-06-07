var express = require('express');
var Log = require('compact-log');
var fs = require('fs');

var log = new Log({
	path: __dirname + '/log',
	levelMode: 'smartNoBrackets'
});

var config = JSON.parse(fs.readFileSync('./config.json'));

var app = express();

app.use(express.static('./static'));

app.listen(config.port);

log.notice('test');
