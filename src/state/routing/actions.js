/**
 * External dependencies
 */

import { pushPath } from 'redux-simple-router';

export function setPath( path ) {
	return pushPath( path );
}

export function setWorkoutRoute( planId, workout ) {
	return pushPath( `/plan/${ planId }/workout/${ workout }` );
}
