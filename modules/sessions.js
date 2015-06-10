// require internal
var config = require('./config');

// require external
var session = require('express-session')(config.sessions);
var sharedsession = require('express-socket.io-session')(session);

function verify_session(data, socket, callback) {
	if(socket.handshake.session.lin) {
		callback(null, socket.handshake.session.userdata);
	} else {
		callback(true, false);
	}
}

module.exports = {session: session, shared: sharedsession, verify_session: verify_session};
