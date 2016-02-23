/**
 * External dependencies
 */

import { pushPath } from 'redux-simple-router';

/**
 * Adds iOS-specific styling to the page.
 */
function applyStyling() {
	document.documentElement.classList.add( 'is-ios-standalone' );
}

/**
 * Tracks and restores the current window location path. This is necessary
 * because otherwise the standalone app will always resume at the path at
 * which the user had saved the page to their home screen.
 *
 * @param {Object} store Redux store instance
 */
function trackPath( store ) {
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

/**
 * Binds to the window applicationCache, forcing a reload without cache when
 * it's determined that the application cache has an update ready. This is
 * necessary because otherwise the changes aren't reflected until the next
 * time the application is loaded.
 */
function reloadOnCacheUpdate() {
	if ( ! window.applicationCache ) {
		return;
	}

	window.applicationCache.addEventListener( 'updateready', () => {
		window.location.reload( true );
	} );
}

/**
 * Enables compatibility features for iOS standalone (home screen) usage,
 * because iOS is misery.
 *
 * @param {Object} store Redux store instance
 */
export default function( store ) {
	if ( ! navigator.standalone || ! /(iPad|iPhone|iPod)/.test( navigator.userAgent ) ) {
		return;
	}

	applyStyling();
	trackPath( store );
	reloadOnCacheUpdate();
}
