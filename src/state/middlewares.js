/**
 * External dependencies
 */

import { LOCATION_CHANGE } from 'react-router-redux';
import get from 'lodash/get';

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
