/**
 * External dependencies
 */

import { push } from 'react-router-redux';

/**
 * Module variables
 */

/**
 * Runtime-assigned value reflecting whether navigator is in standalone mode.
 *
 * @type {Boolean}
 */
const isStandalone = ( () => {
	return navigator.standalone;
} )();

/**
 * Runtime-assigned value reflecting whether device is iOS-based.
 *
 * @type {Boolean}
 */
const isIos = ( () => {
	return /(iPad|iPhone|iPod)/.test( navigator.userAgent );
} )();

/**
 * Adds standalone context classes to the page.
 */
function applyStyling() {
	document.documentElement.classList.toggle( 'is-standalone', isStandalone );
	document.documentElement.classList.toggle( 'is-ios', isIos );
}

/**
 * Tracks and restores the current window location path. This is necessary
 * because otherwise the standalone app will always resume at the path at
 * which the user had saved the page to their home screen.
 *
 * @param {Object} store Redux store instance
 */
function trackPath( store ) {
	if ( ! isStandalone || ! isIos ) {
		return;
	}

	// Restore path from localStorage
	let path = localStorage.getItem( 'path' );
	if ( path && path !== store.getState().routing.path ) {
		store.dispatch( push( path ) );
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

/**
 * Enables compatibility features for standalone (home screen) usage, because
 * iOS is misery.
 *
 * @param {Object} store Redux store instance
 */
export default function( store ) {
	applyStyling();
	trackPath( store );
}
