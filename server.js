/**
 * External dependencies
 */

var express = require( 'express' ),
	compression = require( 'compression' ),
	http = require( 'http' );

/**
 * App initialization
 */

var app = express(),
	server = http.Server( app );

/**
 * Constants
 */

var REGEXP_VALID_PATH = /^\/($|plan\/(new|\w+(\/workout(\/\d+)?)?)|settings|privacy|about)$/,
	PORT = process.env.PORT || 3000;

/**
 * Middlewares
 */

app.use( compression() );

if ( ! process.env.DISABLE_SERVE_STATIC ) {
	app.use( express.static( __dirname + '/public' ) );
}

/**
 * Routes
 */

app.get( '*', function( request, response ) {
	if ( ! REGEXP_VALID_PATH.test( request.path.replace( /.\/$/, '' ) ) ) {
		response.status( 404 );
	}

	response.sendFile( __dirname + '/public/index.html' );
} );

/**
 * Start server
 */

server.listen( PORT, function() {
	/* eslint-disable no-console */
	console.log( 'Listening on port %d...', PORT );
} );
