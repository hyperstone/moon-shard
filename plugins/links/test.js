var expect = require('expect.js');

function oneOneS(done, model, socket) {
	expect(1).to.be.equal(1);
	done();
}

function oneOneC(done, model) {
	expect(1).to.be.equal(1);
	done();
}

module.exports = {socket: {
'one equals one socket': oneOneS
}, clean: {
'one equals one clean': oneOneC
}};