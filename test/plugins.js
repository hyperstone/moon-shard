var config = require('../modules/config');
var crypt = require('../modules/crypt');
var expect = require('expect.js');
var tests = require('../modules/plugins').test();
var sioc = require('socket.io-client');
var Log = require('compact-log');
var log = new Log({
	levelMode: 'smartNoBrackets',
	logLevel: 'info'
});
var db = require('../modules/db');
var SimpleChild = require('simple-child');

describe('plugin tests with socket:', function () {
	var socket, child;

	before(function (done) {
		child = new SimpleChild('node ' + __dirname + '/../app.js');
		child.start();
		var pw = crypt.pepperysalt('test');
		db.model.User.create({username: 'test', password: pw.password, email: 'test', salt: pw.salt}, function (err, small) {
			setTimeout(done, 1000);
		});
	});

	beforeEach(function (done) {
		// Setup
		socket = sioc.connect('http://localhost:' + config.http.port, {
			'reconnection delay': 0,
			'reopen delay': 0,
			'force new connection': true
		});
		socket.on('connect', function () {
			log.debug('connected');
			done();
		});
		socket.on('disconnect', function () {
			log.debug('disconnected');
		})
	});

	afterEach(function(done) {
		// Cleanup
		if(socket.connected) {
			log.debug('disconnecting');
			socket.disconnect();
		} else {
			log.error('no connection to break');
		}
		done();
	});

	for (var p in tests) {
		for (var t in tests[p].socket) {
			it(p + ': ' + t, function(done) {
				tests[p].socket[t](done, db.model[p], socket);
			});
		}
	}

	after(function (done) {
		child.stop();
		db.model.User.remove({username: 'test'}, function(err) {
			expect(err).to.be.eql(null);
			done();
		});
	});
});

describe('plugin tests without socket:', function () {

	before(function (done) {
		done();
	});

	for (var p in tests) {
		for (var t in tests[p].clean) {
			it(p + ': ' + t, function(done) {
				tests[p].clean[t](done, db.model[p]);
			});
		}
	}

});
