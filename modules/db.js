// require external
var mongoose = require('mongoose');

// require internal
var config = require('./config');

var model = {};

function buildSettings() {
	var settings = {};
	for (var setting in config.settings) {
		settings[config.settings[setting]] = String;
	}
	return settings;
}

function setup() {
	mongoose.connect(config.db.main);
	model.User = mongoose.model('User', {username: String, password: String, email: String, salt: String,
		settings: buildSettings()});
}

module.exports = {
	setup: setup,
	model: model,
	mongoose: mongoose
};
