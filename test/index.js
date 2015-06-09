var expect = require('expect.js');
var config = require('../modules/config');
var crypt = require('../modules/crypt');
var sioc = require('socket.io-client');
var Log = require('compact-log');
var log = new Log({
	levelMode: 'smartNoBrackets',
	logLevel: 'info'
});
var db = require('../modules/db');
var SimpleChild = require('simple-child');

describe('login', function () {
	// via http://stackoverflow.com/a/15553045/2857873
	var socket, child;
	
	before(function (done) {
		db.setup();
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

	it('should refuse bad logins', function (done) {
		socket.on('login', function (data) {
			expect(data).to.be.equal(false);
			done();
		});
		socket.emit('login', {data: 'data'});
	});
	
	it('should accept valid logins', function (done) {
		socket.on('login', function (data) {
			expect(data).to.be.equal(true);
			done();
		});
		socket.emit('login', {
			email: 'test',
			password: 'test'
		});
	});

	it('should be able to log out', function (done) {
		socket.on('login', function (data) {
			socket.on('logout', function(data) {
				expect(data).to.be.equal(true);
				done();
			});
			socket.emit('logout', {});
		});
		socket.emit('login', {
			email: 'test',
			password: 'test'
		});
	});

	after(function (done) {
		child.stop();
		setTimeout(function () {
			done();
		}, 1000);
	});
});

describe('database', function () {

	before(function (done) {
		done();
	});

	it('should be able to create user', function (done) {
		db.model.User.create({username: 'bla', password: 'blup', email: 'yolla', salt: ''}, function (err, small) {
			db.model.User.findOne({username: 'bla', password: 'blup', email: 'yolla', salt: ''}, 'email', function(err, user) {
				expect(user.email).to.be.equal('yolla');
				done();
			})
		})
	});

	it('should be able to delete user', function (done) {
		db.model.User.remove({email: 'yolla', salt: ''}, function(err) {
			expect(err).to.be.eql(null);
			done();
		});
	});

});
