/**
 * External dependencies
 */

import { ROUTE_PATH_PUSH, ROUTE_PATH_REPLACE } from 'state/action-types';

/**
 * Returns an action object signalling that the specified path should be pushed
 * to browser history.
 *
 * @param  {String} path URL path
 * @return {Object}      Action object
 */
export function pushRoutePath( path ) {
	return {
		type: ROUTE_PATH_PUSH,
		path
	};
}

/**
 * Returns an action object signalling that the specified path should replace
 * current browser history location.
 *
 * @param  {String} path URL path
 * @return {Object}      Action object
 */
export function replaceRoutePath( path ) {
	return {
		type: ROUTE_PATH_REPLACE,
		path
	};
}

/**
 * Returns an action object signalling that a workout path corresponding to the
 * specified plan and workout should be pushed to browser history.
 *
 * @param  {String} planId  Plan ID
 * @param  {Number} workout Workout
 * @return {Object}         Action object
 */
export function setWorkoutRoute( planId, workout ) {
	return pushRoutePath( `/plan/${ planId }/workout/${ workout }` );
}
