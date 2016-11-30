/**
 * External dependencies
 */

const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const assign = require( 'lodash/assign' );

/**
 * Internal dependencies
 */

const common = require( './webpack.config.common' );

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
				loader: ExtractTextPlugin.extract( 'raw!postcss!sass?outputStyle=compressed' )
			}
		]
	} ),
	plugins: common.plugins.concat( [
		new webpack.optimize.UglifyJsPlugin( {
			compress: {
				warnings: false
			}
		} ),
		new ExtractTextPlugin( 'dist/app-[hash].css', {
			allChunks: true
		} )
	] )
} );
