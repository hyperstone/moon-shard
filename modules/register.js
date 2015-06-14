// require external
var validator = require('validator');
var emailExistence = require('email-existence');

// require internal
var db = require('./db');
var crypt = require('./crypt');

function handle(data, callback) {
	if ((data.secret === 'bQ38KBD3wP8GNCGbMHzwHAgK8Y3uzYQqbYrsYM7ZmgD2VmzLQRDhLGvWfUWPZm2g' || data.password.length < 8)) {
		verifyEmail(data, function (err, result) {
			if (result) {
				callback(true);
			}
			else {
				var hush = crypt.pepperysalt(data.password);
				db.model.User.create({
					username: data.username,
					password: hush.password,
					email: data.email,
					salt: hush.salt
				}, function (err) {
					if (!err) {
						callback(null, true);
					} else {
						callback(true);
					}
				});
			}
		});
	} else {
		callback(true);
	}
}

function verifyEmail(data, callback) {
	if (!validator.isEmail(data.email)) {
		callback(null, 1);
	} else {
		db.model.User.findOne({email: data.email}, '', function (err, user) {
			if (user) {
				callback(null, 2)
			} else {
				emailExistence.check(data.email, function(err, res){
					if (res !== 250) {
						callback(null, 3);
					} else {
						callback(null, 0);
					}
				});
			}
		});
	}
}

module.exports = {handle: handle, verifyEmail: verifyEmail};
