// require external
var sio = require('socket.io');

// require internal
var config = require('./config');

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
	});
}

// export
module.exports = {
	init: init
};
