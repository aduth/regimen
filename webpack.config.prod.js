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
			'path-to-regexp',
			'pouchdb',
			'pouchdb-validation',
			'react',
			'react-addons-css-transition-group',
			'react-dom',
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
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: __dirname + '/src',
				use: [
					{ loader: 'babel-loader' }
				]
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract( {
					loader: [
						{ loader: 'raw-loader' },
						{ loader: 'postcss-loader' },
						{
							loader: 'sass-loader',
							query: {
								outputStyle: 'compressed'
							}
						}
					]
				} )
			}
		]
	},
	plugins: common.plugins.concat( [
		new webpack.optimize.CommonsChunkPlugin( {
			name: 'vendor',
			filename: 'dist/[name]-[hash].min.js',
			minChunks: Infinity
		} ),
		new webpack.LoaderOptionsPlugin( {
			minimize: true,
			debug: false
		} ),
		new webpack.optimize.UglifyJsPlugin( {
			compress: {
				warnings: false
			}
		} ),
		new ExtractTextPlugin( {
			filename: 'dist/[name]-[hash].css',
			disable: false,
			allChunks: true
		} )
	] )
} );
