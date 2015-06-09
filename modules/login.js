// require internal
var db = require('./db');
var crypt = require('./crypt');

function handle(data, socket) {
	db.model.User.findOne({email: data.email}, 'password salt username email', function(err, user) {
		if (!user) {
			socket.emit('login', false);
		} else {
			if (!(crypt.saltypepper(data.password, user.password, user.salt))) {
				socket.emit('login', false);
			} else {
				socket.handshake.session.lin = true;
				socket.handshake.session.userdata = {username: user.username, email: user.email};
				socket.handshake.session.save();
				socket.emit('login', true);
			}
		}
	})
}

module.exports = handle;
