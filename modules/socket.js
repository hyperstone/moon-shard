// require
var sio = require('socket.io');

// import from main module
var config = process.mainModule.exports.config;
var mainLog = process.mainModule.exports.log;
var log = mainLog.createNamespace({
	name: 'socket'
});
var root = process.mainModule.exports.root;

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
			log.debug(data);
		});
	});
}

// export
module.exports = {
	init: init
};
