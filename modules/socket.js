// require external
var sio = require('socket.io');

// require internal
var config = require('./config');
var sharedsession = require('./sessions').shared;

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
	io.use(sharedsession);

	// connection listener
	io.on('connection', function (socket) {
		socket.on('login', function (data) {
			log.debug(data);
			require('./login')(data, socket);
		});
		socket.on('logout', function (data) {
			log.debug(data);
			require('./logout')(data, socket);
		});
		socket.on('register', function (data) {
			log.debug(data);
			require('./register')(data, socket);
		});
		socket.on('verify_session', function (data) {
			log.debug(data);
			require('./sessions').verify_session(data, socket);
		});
	});
}

// export
module.exports = {
	init: init
};
