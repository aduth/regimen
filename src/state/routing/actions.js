/**
 * External dependencies
 */

import { push } from 'react-router-redux';

export function setPath( path ) {
	return push( path );
}

export function setWorkoutRoute( planId, workout ) {
	return push( `/plan/${ planId }/workout/${ workout }` );
}
