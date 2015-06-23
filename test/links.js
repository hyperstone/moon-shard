var config = require('../modules/config');
var crypt = require('../modules/crypt');
var expect = require('expect.js');
var sioc = require('socket.io-client');
var Log = require('compact-log');
var log = new Log({
	levelMode: 'smartNoBrackets',
	logLevel: 'info'
});
var db = require('../modules/db');
var SimpleChild = require('simple-child');

describe('links', function () {
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

	function add(done) {
		socket.emit('login', {email: 'test', password: 'test'}, function(err, data) {
			expect(err).to.not.be.ok();
			expect(data).to.be.ok();
			socket.emit('links.add', {url: 'hw.gg', name: 'best website von ever', icon: ''}, function (err, data) {
				expect(data).to.be.ok();
				expect(err).to.not.be.ok();
				socket.emit('logout', function(err, data) {
					expect(data).to.be.ok();
					expect(err).to.not.be.ok();
					done();
				});
			});
		});
	}

	function get(done) {
		socket.emit('login', {email: 'test', password: 'test'}, function(err, data) {
			expect(err).to.not.be.ok();
			expect(data).to.be.ok();
			socket.emit('links.get', function (err, data) {
				expect(err).to.not.be.ok();
				socket.emit('logout', function(err, data) {
					expect(data).to.be.ok();
					expect(err).to.not.be.ok();
					done();
				});
			});
		});
	}

	function remove(done) {
		socket.emit('login', {email: 'test', password: 'test'}, function(err, data) {
			expect(err).to.not.be.ok();
			expect(data).to.be.ok();
			socket.emit('links.remove', {name: 'best website von ever', url: 'hw.gg'}, function (err, data) {
				expect(err).to.not.be.ok();
				socket.emit('logout', function(err, data) {
					expect(data).to.be.ok();
					expect(err).to.not.be.ok();
					done();
				});
			});
		});
	}

	it('should add link', add);
	it('should get link', get);
	it('should remove link', remove);

	after(function (done) {
		child.stop();
		db.model.User.remove({username: 'test'}, function(err) {
			expect(err).to.be.eql(null);
			done();
		});
	});
});
