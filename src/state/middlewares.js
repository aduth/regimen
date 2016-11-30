/**
 * External dependencies
 */

import get from 'lodash/get';

/**
 * Internal dependencies
 */

import { ROUTE_PATH_PUSH } from './action-types';
export { default as routing } from './routing/middleware';

/**
 * Given a Google Analytics analytics.js instance, returns a Redux middleware
 * which tracks an Action event when an action is dispatched to the store
 * containing analytics metadata.
 *
 * @param  {Object}   ga Google Analytics instance
 * @return {Function}    Redux middleware
 */
export function analytics( ga ) {
	return () => ( next ) => ( action ) => {
		const meta = get( action, [ 'meta', 'analytics' ] );
		if ( meta ) {
			ga( 'send', 'event', 'Action', meta.action, meta.label, meta.value );
		}

		return next( action );
	};
}

/**
 * Given a Google Analytics analytics.js instance, returns a Redux middleware
 * which tracks page view events from the routing path change actions.
 *
 * @param  {Object}   ga Google Analytics instance
 * @return {Function}    Redux middleware
 */
export function pageView( ga ) {
	return () => ( next ) => ( action ) => {
		if ( ROUTE_PATH_PUSH === action.type ) {
			ga( 'send', 'pageview', action.path );
		}

		return next( action );
	};
}
