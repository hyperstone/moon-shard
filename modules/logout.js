function handle(data, socket) {
	socket.handshake.session.lin = false;
	socket.handshake.session.userdata = {};
	socket.handshake.session.save();
	socket.emit('logout', true);
}

module.exports = handle;
