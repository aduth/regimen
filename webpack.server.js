/**
 * External dependencies
 */

const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );

/**
 * Internal dependencies
 */

const config = require( './webpack.config.dev' );

new WebpackDevServer( webpack( config ), {
	contentBase: __dirname + '/public',
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true,
		chunks: false
	}
} ).listen( 3000, 'localhost', function( err ) {
	/* eslint-disable no-console */
	console.log( err ? err : 'Listening on port 3000...' );
} );
