// require internal
var db = require('./db');
var crypt = crypto('./crypt');

function handle(data, socket) {
	db.model.User.findOne({email: data.email}, 'password salt', function(err, user) {
		if (!user) {
			socket.emit('login', false);
		} else {
			if (!(crypt.saltypepper(data.password, user.password, user.salt))) {
				socket.emit('login', false);
			} else {
				socket.handshake.session.email = data.email;
				socket.handshake.session.save();
				socket.emit('login', true);
			}
		}
	})
}
