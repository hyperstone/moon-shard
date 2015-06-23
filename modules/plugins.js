// require external
var fs = require('fs');
var path = require('path');

// require internal
var config = require('./config');

function getConf(name) {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '..', config.plugins.path, name, 'plugin.json'), 'utf8'));
}

function db(mongoose, model, name) {
	var conf = getConf(name);
	if (conf.database.required) {
		model[name] = {};
		for (var m in conf.database.models) {
			model[name][m] = mongoose.model(name + '.' + m, conf.database.models[m]);
		}
		require(path.join(__dirname, '..', config.plugins.path, name, 'plugin')).setModel(model[name]);
	}
}

function databaseInit(mongoose, model) {
	config.plugins.load.forEach(function (plugin) {
		db(mongoose, model, plugin);
	});
}

module.exports = {db: databaseInit};
