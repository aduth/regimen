/**
 * External dependencies
 */

import { push } from 'react-router-redux';

/**
 * Returns an action object signalling that the specified path should be pushed
 * to browser history.
 *
 * @param  {String} path URL path
 * @return {Object}      Action object
 */
export function setPath( path ) {
	return push( path );
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
	return push( `/plan/${ planId }/workout/${ workout }` );
}
