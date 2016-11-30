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
			'fastclick',
			'path-to-regexp',
			'pouchdb',
			'pouchdb-validation',
			'react',
			'react-addons-css-transition-group',
			'react-dom',
			'react-helmet',
			'react-jsonschema-form',
			'react-redux',
			'redux',
			'redux-thunk',
			'shortid'
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
