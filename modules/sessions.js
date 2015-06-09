// require internal
var config = require('./config');

// require external
var session = require('express-session')(config.sessions);
var sharedsession = require('express-socket.io-session')(session);

function verify_session(data, socket) {
	if(socket.handshake.session.lin) {
		socket.emit('verify_session', socket.handshake.session.userdata);
	} else {
		socket.emit('verify_session', false);
	}
}

module.exports = {session: session, shared: sharedsession, verify_session: verify_session};