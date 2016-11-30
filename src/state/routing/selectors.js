/**
 * Internal dependencies
 */

import { getRouteMatch } from 'routes';

/**
 * Returns the current route path.
 *
 * @param  {Object} state Global state
 * @return {String}       Current route path
 */
export function getRoutePath( state ) {
	return state.routing.path;
}

/**
 * Returns details of the currently matched route, including Route (component),
 * params (matched path fragments), and query (from querystring).
 *
 * @param  {Object} state Global state
 * @return {Object}       Current route details
 */
export const getMatchedRoute = ( () => {
	let lastPath, lastMatched;

	return ( state ) => {
		const nextPath = getRoutePath( state );
		if ( nextPath !== lastPath ) {
			lastMatched = getRouteMatch( getRoutePath( state ) );
		}

		lastPath = nextPath;
		return lastMatched;
	};
} )();
