// require external
var sio = require('socket.io');

// require internal
var sharedSession = require('./sessions').shared;
var register = require('./register');
var settings = require('./settings');


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
			settings.set(data, socket, callback);
		});
		socket.on('get_settings', function (callback) {
			settings.get(socket, callback);
		});
		require('./plugins').bind(socket);
	});
}

// export
module.exports = {
	init: init
};
