module.exports = {
  entry: './lib/app.js',
  output: {
    path: __dirname,
    filename: 'app.min.js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'bower_components'
    ]
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'msx-loader'},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.svg$/, loader: "svg-loader"},
      {test: /\.png$|\.woff/, loader: "url-loader?limit=100000"},
      {test: /\.jpg$|\.eot|\.ttf/, loader: "file-loader"}
    ]
  }
};
