var fs = require('fs');
var path = require('path');

function getConfig (name) {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config/', name + '.json'), 'utf8'));
}

module.exports = {
	http: getConfig('http')
};
