const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');
const compiler = webpack(webpackConfig);

app.use(express.static(path.join(__dirname, 'www')))

app.use(webpackDevMiddleware(compiler, {
	hot: true,
	filename: 'bundle.js', 
	publicPath: '/',
	stats: {
		colors: true,
	},
	historyApiFallback: true,
}));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(3000, function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log('App listening at http:\\%s:%s', host, port)
});
