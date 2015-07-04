// reuqire external
var http = require('http');

function handle(data, socket, callback) {
	if (!data || !data.name || data.name.match('[^.\-0-9a-zA-Z]')) {
		callback(true);
	}
	else {
		http.get('http://' + data.name, function (res) {
			callback(null, true);
		}).on('error', function(e) {
			callback(null, false);
		});;
	}
}

module.exports = handle;
