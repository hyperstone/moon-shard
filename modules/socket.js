// require external
var sio = require('socket.io');

// require internal
var sharedSession = require('./sessions').shared;
var register = require('./register');
var settings = require('./settings');
var sessions = require('./sessions');

// require plugins
var links = require('../plugins/links/plugin');
var isup = require('../plugins/isup/plugin');
var notepad = require('../plugins/notepad/plugin');

// set up log
var log = require('./log').createNamespace({
	name: 'socket'
});

// declare global variables
var io;

function init (servers) {
	// bind server
	io = sio();
	for (var i = 0; i < servers.length; i++) {
		io.attach(servers[i]);
	}

	// sessions
	io.use(sharedSession);

	// connection listener
	io.on('connection', function (socket) {
		socket.on('login', function (data, callback) {
			log.debug(data);
			require('./login')(data, socket, callback);
		});
		socket.on('logout', function (callback) {
			require('./logout')(socket, callback);
		});
		socket.on('register', function (data, callback) {
			log.debug(data);
			register.handle(data, callback);
		});
		socket.on('verify_session', function (callback) {
			require('./sessions').verify(socket, callback);
		});
		socket.on('verify_email', function (data, callback) {
			register.verifyEmail(data, socket, callback);
		});
		socket.on('set_settings', function (data, callback) {
			sessions.auth(socket, settings.set, callback, data);
		});
		socket.on('get_settings', function (callback) {
			sessions.auth(socket, settings.get, callback);
		});
		socket.on('links.add', function(data, callback) {
			sessions.auth(socket, links.add, callback, data);
		});
		socket.on('links.get', function(callback) {
			sessions.auth(socket, links.get, callback);
		});
		socket.on('links.remove', function(data, callback) {
			sessions.auth(socket, links.remove, callback, data);
		});
		socket.on('isup.check', function(data, callback) {
			sessions.auth(socket, isup, callback, data);
		});
    socket.on('notepad.set', function(data, callback) {
			sessions.auth(socket, notepad.set, callback, data);
		});
		socket.on('notepad.get', function(callback) {
			sessions.auth(socket, notepad.get, callback);
		});
	});
}

// export
module.exports = {
	init: init
};
