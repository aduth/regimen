/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
	OfflinePlugin = require( 'offline-plugin' ),
	assign = require( 'lodash/assign' );

/**
 * Internal dependencies
 */

var common = require( './webpack.config.common' );

module.exports = assign( {}, common, {
	entry: __dirname + '/src/index.js',
	module: assign( {}, common.module, {
		loaders: [
			{
				test: /\.jsx?$/,
				include: __dirname + '/src',
				loaders: [ 'babel' ]
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract( 'raw!autoprefixer!sass?outputStyle=compressed' )
			}
		]
	} ),
	plugins: common.plugins.concat( [
		new webpack.optimize.UglifyJsPlugin( {
			compress: {
				warnings: false
			}
		} ),
		new ExtractTextPlugin( 'main-[hash].css', {
			allChunks: true
		} ),
		new webpack.DefinePlugin( {
			__DEV__: false,
			'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
		} ),
		new OfflinePlugin( {
			updateStrategy: 'hash',
			caches: {
				main: [ ':rest:' ],
				additional: [
					'/manifest.json',
					'/favicon.ico',
					'/images/icon-48.png',
					'/images/icon-96.png',
					'/images/icon-144.png',
					'/images/icon-192.png'
				]
			},
			externals: [
				'/manifest.json',
				'/favicon.ico',
				'/images/icon-48.png',
				'/images/icon-96.png',
				'/images/icon-144.png',
				'/images/icon-192.png'
			]
		} )
	] )
} );
