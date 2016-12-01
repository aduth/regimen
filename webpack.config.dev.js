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
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: __dirname + '/src',
				use: [
					{
						loader: 'babel-loader',
						query: {
							cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' }
				]
			}
		]
	},
	plugins: common.plugins.concat( [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	] )
} );
