/**
 * External dependencies
 */

import { pushPath } from 'redux-simple-router';

export function setWorkoutRoute( planId, workout ) {
	return pushPath( `/plan/${ planId }/workout/${ workout }` );
}
