// require internal
var config = require('./config');

// require external
var session = require('express-session')(config.sessions);
var sharedsession = require('express-socket.io-session')(session);

function verify_session(socket, data) {
	if(socket.handshake.session.lin) {
		socket.emit(socket.handshake.session.lin);
	} else {
		socket.emit(false);
	}
}

module.exports = {session: session, shared: sharedsession, verify_session: verify_session};