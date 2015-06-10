// require external
var sio = require('socket.io');

// require internal
var sharedSession = require('./sessions').shared;
var session = require('./sessions').session;

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
		socket.on('logout', function (data, callback) {
			log.debug(data);
			require('./logout')(data, socket, callback);
		});
		socket.on('register', function (data, callback) {
			log.debug(data);
			require('./register')(data, socket, callback);
		});
		socket.on('verify_session', function (callback) {
			require('./sessions').verify(socket, callback);
		});
	});
}

// export
module.exports = {
	init: init
};
