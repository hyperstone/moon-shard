var model = null;

var config = JSON.parse(fs.readFileSync('plugin.json'), 'utf8')).config;


function setModel(m) {
	model = m;
}

function get(socket, callback) {
	model.Notes.findOne({user: socket.handshake.session.userdata.email}, 'text', function(err, notes) {
		if (err) {
			callback(true);
		} else {
			callback(null, notes);
		}
	});
}

function set(data, socket, callback) {
	if (!data || !(data.text) || data.text.length > config.max_length) {
		callback(true);
	} else {
		model.Notes.create({user: socket.handshake.session.userdata.email, text: data.text},
			function (err) {
			if (err) {
				callback(true);
			} else {
				callback(null, true);
			}
		});
	}
}

module.exports = {get: get, add: add, setModel: setModel};
