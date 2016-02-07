/**
 * External dependencies
 */

var webpack = require( 'webpack' ),
	assign = require( 'lodash/assign' );

/**
 * Internal dependencies
 */

var common = require( './webpack.config.common' );

module.exports = assign( {}, common, {
	cache: true,
	entry: [
		'webpack-dev-server/client?/',
		'webpack/hot/only-dev-server',
		__dirname + '/src/index.js'
	],
	devtool: 'source-map',
	module: assign( {}, common.module, {
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
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin( {
			__DEV__: true,
			'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
		} )
	] )
} );
