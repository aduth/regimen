/**
 * External dependencies
 */

import { pushPath } from 'redux-simple-router';

export default function( store ) {
	if ( ! navigator.standalone || ! /(iPad|iPhone|iPod)/.test( navigator.userAgent ) ) {
		return;
	}

	// Apply page styling
	document.documentElement.classList.add( 'is-ios-standalone' );

	// Restore path from localStorage
	let path = localStorage.getItem( 'path' );
	if ( path && path !== store.getState().routing.path ) {
		store.dispatch( pushPath( path ) );
	}

	// Subscribe to path changes
	store.subscribe( () => {
		const state = store.getState();
		if ( state.routing.path !== path ) {
			path = state.routing.path;
			localStorage.setItem( 'path', path );
		}
	} );
}
