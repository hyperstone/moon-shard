function handle(data, socket, callback) {
	socket.handshake.session.loggedIn = false;
	socket.handshake.session.userdata = {};
	socket.handshake.session.save();
	callback(null, true);
}

module.exports = handle;
