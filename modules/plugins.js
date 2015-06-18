// require external
var fs = require('fs');
var path = require('path');

// require internal
var config = require('./config');

function getConf(name) {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '..', config.plugins.path, name, 'plugin.json'), 'utf8'));
}

function bind(socket, name) {
	var conf = getConf(name);
	for (var fun in conf.binds) {
		if (conf.binds[fun].data) {
			socket.on(name + '.' + fun, function(data, callback){
				require(path.join(__dirname, '..', config.plugins.path, name, 'plugin'))[fun](data, socket, callback);
			});
		} else {
			socket.on(name + '.' + fun, function(callback){
				require(path.join(__dirname, '..', config.plugins.path, name, 'plugin'))[fun](socket, callback);
			});
		}
	}
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

function bindPlugins(socket) {
	config.plugins.load.forEach(function (plugin) {
		bind(socket, plugin);
	});
}

function databaseInit(mongoose, model) {
	config.plugins.load.forEach(function (plugin) {
		db(mongoose, model, plugin);
	});
}

function getTests() {
	var tests = {};
	config.plugins.load.forEach(function (plugin) {
		tests[plugin] = require(path.join(__dirname, '..', config.plugins.path, plugin, 'test'));
	});
	return tests;
}

module.exports = {bind: bindPlugins, db: databaseInit, test: getTests};
