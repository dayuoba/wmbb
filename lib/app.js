var Application = require('./application.js');
var config = require('./config/config.js');

Application
	.init(config)
	.start();