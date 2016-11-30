/**
 * External dependencies
 */

const webpack = require( 'webpack' );

/**
 * Internal dependencies
 */

const common = require( './webpack.config.common' );

module.exports = Object.assign( {}, common, {
	cache: true,
	entry: [
		'webpack-dev-server/client?/',
		'webpack/hot/only-dev-server',
		__dirname + '/src/index.js'
	],
	devtool: 'source-map',
	module: Object.assign( {}, common.module, {
		loaders: [
			{
				test: /\.jsx?$/,
				include: __dirname + '/src',
				loaders: [ 'react-hot', 'babel?cacheDirectory' ]
			},
			{
				test: /\.scss$/,
				loaders: [ 'style', 'css', 'postcss', 'sass' ]
			}
		]
	} ),
	plugins: common.plugins.concat( [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	] )
} );
