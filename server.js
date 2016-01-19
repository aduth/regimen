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
 * Module variables
 */

var port = process.env.PORT || 3000;

/**
 * Middlewares
 */

app.use( compression() );
app.use( express.static( __dirname + '/www' ) );

/**
 * Routes
 */

app.get( '*', function( request, response ) {
	response.sendFile( __dirname + '/www/index.html' );
} );

/**
 * Start server
 */

server.listen( port, function() {
	/* eslint-disable no-console */
	console.log( 'Listening on port %d...', port );
} );
