// require internal
var config = require('./config');

// set up log
var log = require('./log').createNamespace({
	name: 'sessions',
	colors: ['bgYellow', 'black']
});

// require external
var session = require('express-session')(config.sessions);
var sharedSession = require('express-socket.io-session')(session);

function verify (socket, callback) {
	log.debug(socket.handshake.session, socket.handshake.session.id);
	if(socket.handshake.session.loggedIn) {
		callback(null, socket.handshake.session.userdata);
	} else {
		callback(true, null);
	}
}

module.exports = {
	session: session,
	shared: sharedSession,
	verify: verify
};
