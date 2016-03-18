/**
 * External dependencies
 */

import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Given a Google Analytics analytics.js instance, returns a Redux middleware
 * which tracks an Action event when a non-internal action is dispatched to the
 * Redux store.
 *
 * @param  {Object}   ga Google Analytics instance
 * @return {Function}    Redux middleware
 */
export function analytics( ga ) {
	const REGEXP_INTERNAL_TYPE = /^@@/;

	return () => ( next ) => ( action ) => {
		if ( ! REGEXP_INTERNAL_TYPE.test( action.type ) ) {
			ga( 'send', 'event', 'Action', action.type );
		}

		return next( action );
	};
}

/**
 * Given a Google Analytics analytics.js instance, returns a Redux middleware
 * which tracks page view events from the React Router Redux location change
 * action.
 *
 * @param  {Object}   ga Google Analytics instance
 * @return {Function}    Redux middleware
 */
export function pageView( ga ) {
	return () => ( next ) => ( action ) => {
		if ( LOCATION_CHANGE === action.type ) {
			ga( 'send', 'pageview', action.payload.pathname );
		}

		return next( action );
	};
}
