run:
	webpack; uglify -s app.min.js -o app.min.js;node server.js
config:
	webpack; uglify -s app.min.js -o app.min.js
package:
	webpack
mini:
	uglify -s app.min.js -o app.min.js
