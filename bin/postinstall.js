#!/usr/bin/env node
/* eslint-disable no-console */

var spawn;

if ( 'production' !== process.env.NODE_ENV ) {
	console.log( 'Skipping post-install build for development environment.' );
	process.exit( 0 );
}

console.log( 'Building bundle for production environment...' );
spawn = require( 'child_process' ).spawn;
spawn( 'npm', [ 'run', 'build' ], {
	stdio: 'inherit'
} );
