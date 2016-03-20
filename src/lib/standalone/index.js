/**
 * External dependencies
 */

import { LOCATION_CHANGE, push } from 'react-router-redux';

/**
 * Returns true if navigator is in standalone mode.
 *
 * @return {Boolean} Whether navigator is in standalone mode
 */
export function isStandalone() {
	return !! navigator.standalone;
}

/**
 * Returns true if device is iOS-based.
 *
 * @return {Boolean} Whether device is iOS-based
 */
export function isIos() {
	return /(iPad|iPhone|iPod)/.test( navigator.userAgent );
}

/**
 * Adds standalone context classes to the page.
 */
function applyStyling() {
	document.documentElement.classList.toggle( 'is-standalone', isStandalone() );
	document.documentElement.classList.toggle( 'is-ios', isIos() );
}

/**
 * Tracks and restores the current window location path. This is necessary
 * because otherwise the standalone app will always resume at the path at
 * which the user had saved the page to their home screen.
 *
 * @param {Object} store Redux store instance
 */
function trackPath( store ) {
	if ( ! isStandalone() || ! isIos() ) {
		return;
	}

	// Restore path from localStorage
	let path = localStorage.getItem( 'path' );
	if ( path && path !== store.getState().routing.path ) {
		store.dispatch( push( path ) );
	}

	// Enhance store dispatch to monitor path changes
	const _dispatch = store.dispatch;
	store.dispatch = ( action ) => {
		_dispatch( action );

		if ( LOCATION_CHANGE !== action.type ) {
			return;
		}

		const nextPath = action.payload.pathname;
		if ( nextPath !== path ) {
			path = nextPath;
			localStorage.setItem( 'path', path );
		}
	};
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
