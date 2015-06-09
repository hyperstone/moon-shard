// require external
var mongoose = require('mongoose');

// require internal
var config = require('./config');

var model = {};

function setup() {
	mongoose.connect(config.db.main);
	model.User = mongoose.model('User', {username: String, password: String, email: String, salt: String});
}

module.exports = {
	setup: setup,
	model: model,
	mongoose: mongoose
};
