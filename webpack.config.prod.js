/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
	assign = require( 'lodash/object/assign' );

/**
 * Internal dependencies
 */

var common = require( './webpack.config.common' );

module.exports = assign( {}, common, {
	entry: __dirname + '/src/index.js',
	module: {
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
	},
	plugins: common.plugins.concat( [
		new webpack.optimize.UglifyJsPlugin( {
			compress: {
				warnings: false
			}
		} ),
		new ExtractTextPlugin( 'main.css', {
			allChunks: true
		} ),
		new webpack.DefinePlugin( {
			__DEV__: false,
			'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
		} )
	] )
} );
