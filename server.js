var server = new ( require( 'node-static' ) ).Server( './www' );
require( 'http' ).createServer( function( request, response ) {
	request.addListener( 'end', function() {
		server.serve( request, response );
	} ).resume();
} ).listen( process.env.PORT || 3000 );
