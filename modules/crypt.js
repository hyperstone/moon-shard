// require external
var crypto = require('crypto');

// require internal
var config = require('./config');

function pepperysalt(password) {
	var salt = crypto.randomBytes(64).toString('hex');
	var hashed = crypto.createHash('sha512').update(password + salt + config.crypto.pepper).digest('base64');
	return {password: hashed, salt: salt}
}

function saltypepper(password, dbpassword, salt) {
	return crypto.createHash('sha512').update(password + salt + config.crypto.pepper).digest('base64') == dbpassword;
}

module.exports = {pepperysalt: pepperysalt, saltypepper: saltypepper};
