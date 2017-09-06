const builder = require('webpack-configify').default
const PROD = process.env.NODE_ENV == 'production'
const conf = builder()
	.production(PROD)
	.development(!PROD)
	.loader('.js', 'babel-loader')
	.merge({
		entry: './src/index.js',
		output: {
			library: 'MuiDialogs',
			libraryTarget: 'umd',
			filename: './dist/material-ui-dialogs.js',
		},
	})
	.build()
module.exports = conf
if (require.main === module) {
	const {inspect} = require('util')
	console.log(inspect(conf, null, null))
}