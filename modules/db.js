// require external
var mongoose = require('mongoose');

// require internal
var config = require('./config');
var plugins = require('./plugins');

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
	plugins.db(mongoose, model);
}

module.exports = {
	setup: setup,
	model: model,
	mongoose: mongoose
};
