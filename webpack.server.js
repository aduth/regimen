const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );
const config = require( './webpack.config.dev' );

new WebpackDevServer( webpack( config ), {
	contentBase: __dirname + '/public',
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true
	}
} ).listen( 3000, 'localhost', function( err ) {
	/* eslint-disable no-console */
	console.log( err ? err : 'Listening on port 3000...' );
} );
