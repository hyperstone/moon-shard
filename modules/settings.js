// require internal
var db = require('./db');
var config = require('./config');

function get(socket, callback) {
	db.model.User.findOne({email: socket.handshake.session.email}, 'settings', function (err, user) {
		if (err) {
			callback(true);
		} else {
			callback(null, user.settings);
		}
	});
}

function set(data, socket, callback) {
  if (!data) {
    callback(true);
  } else {
    db.model.User.findOne({email: socket.handshake.session.email}, 'settings', function (err, user) {
		  if (err) {
			  callback(true);
		  } else {
			  try {
          for (var setting in user.settings) {
				    if (data[setting].length <= config.settings[setting]) {
					    user.settings[setting] = data[setting];
					    user.save();
				    }
			    }
			    callback(null, true);
			  } catch (e) {
			    callback(true);
			  }
		  }
	  });
  }
}

module.exports = {get: get, set: set};
