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
		socket.emit('news', {hello: 'world'});
		socket.on('customEvent', function (data) {
			log.debug('customEvent', data);
		});
		socket.on('login', function (data) {
			log.debug('login', data);
			if (data && data.username && data.password) {
				socket.emit('login', {
					token: 'exampleToken'
				});
			} else {
				socket.emit('login', false);
			}
		});
		socket.on('register', function(data) {
			require(register)(data, socket);
		});
	});
}

// export
module.exports = {
	init: init
};
