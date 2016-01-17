/**
 * External dependencies
 */

import { pushState } from 'redux-router';

export function setPlanWorkout( planId, workout ) {
	return pushState( null, `/plan/${ planId }/workout/${ workout }` );
}
