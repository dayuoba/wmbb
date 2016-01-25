## A Framework Like Webpack-Mithril-Bootstrap-Boilerplate

We use mithril,webpack and material design lite for our architecture 

### Usage 

* clone this repository

* npm i webpack webpack-dev-server -g

* npm i

* webpack-dev-server --inline

See `localhost:8080`

### Commit Tool

npm install -g commitizen

npm i

> update something;git add .;git cz;

### Architecture
	All scource files are in lib/, some public modules in node_modules/bower_components.combine the files with webpack
	lib/app.js -- the main entry
	lib/application.js -- the the app.basic APIs, organize the M/V/VM
	lib/assets -- static files like images/styles
	lib/components -- the VM components
	lib/models -- the M
	lib/views -- the V, as jsx is a readable syntax,we use .jsx as default
	lib/config -- the config files

