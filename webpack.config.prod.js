/**
 * External dependencies
 */

const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

/**
 * Internal dependencies
 */

const common = require( './webpack.config.common' );

module.exports = Object.assign( {}, common, {
	entry: {
		vendor: [
			'classnames',
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'redux-thunk'
		],
		app: __dirname + '/src/index.js'
	},
	output: Object.assign( {}, common.output, {
		filename: 'dist/[name]-[hash].min.js'
	} ),
	module: Object.assign( {}, common.module, {
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
		new webpack.optimize.CommonsChunkPlugin( 'vendor', 'dist/[name]-[hash].min.js', Infinity ),
		new webpack.optimize.UglifyJsPlugin( {
			compress: {
				warnings: false
			}
		} ),
		new ExtractTextPlugin( 'dist/[name]-[hash].css', {
			allChunks: true
		} )
	] )
} );
