var loopback = require('loopback');

module.exports = function enableAuthentication(server) {
	server.enableAuth();
};
