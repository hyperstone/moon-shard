var fs = require('fs');
var path = require('path');

// fetch config from file
function getConfig (name) {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config/', name + '.json'), 'utf8'));
}

// export config
module.exports = {
	http: getConfig('http'),
	https: getConfig('https'),
	log: getConfig('log'),
	db: getConfig('db'),
	sessions: getConfig('sessions'),
	crypto: getConfig('crypto'),
	settings: getConfig('settings'),
	plugins: getConfig('plugins')
};
