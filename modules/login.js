// require internal
var db = require('./db');
var crypt = require('./crypt');

function handle (data, socket, callback) {
	if (!data || !(data.email && data.password)) {
		callback(true);
	} else {
		db.model.User.findOne({email: data.email}, 'password salt username email', function(err, user) {
			if (!user) {
				callback(true, false);
			} else {
				if (!(crypt.saltypepper(data.password, user.password, user.salt))) {
					callback(true, false);
				} else {
					socket.handshake.session.loggedIn = true;
					socket.handshake.session.userdata = {username: user.username, email: user.email};
					socket.handshake.session.save();
					callback(null, true);
				}
			}
		});
	}
}

module.exports = handle;
