// require internal
var config = require('./config');

// require external
var session = require('express-session')(config.sessions);
var sharedsession = require('express-socket.io-session')(session);

module.exports = {session: session, shared: sharedsession};