'use strict'

module.exports = {
	devtool: '#source-maps',
	entry: './test/index-source.js',
	output: {
		filename: './test/index.js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}],
	},
}
