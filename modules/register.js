// require internal
var db = require('./db');
var crypt = require('./crypt');

function handle(data, socket) {
	db.model.User.findOne({email: data.email}, '', function(err, user) {
		if(user || (data.secret !== 'bQ38KBD3wP8GNCGbMHzwHAgK8Y3uzYQqbYrsYM7ZmgD2VmzLQRDhLGvWfUWPZm2g' ||
			data.password.length < 8)) {
			socket.emit('register', false);
		}
		else {
			var hush = crypt.pepperysalt(data.password);
			db.model.User.create({username: data.username, password: hush.password, email: data.email, salt: hush.salt},
				function (err){
					if(!err) {socket.emit('register', true);}
			});
		}
	});
}

module.exports = handle;
