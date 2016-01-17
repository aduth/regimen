/**
 * External dependencies
 */

import some from 'lodash/collection/some';

/**
 * Internal dependencies
 */

import * as routines from 'routines';

export function getPlan( state, planId ) {
	return state.plans.items[ planId ];
}

export function getPlanRoutine( state, planId ) {
	const plan = getPlan( state, planId );
	if ( ! plan || ! routines[ plan.routine ] ) {
		return null;
	}

	return routines[ plan.routine ];
}

export function isRequestingPlan( state, planId ) {
	return state.plans.fetching[ planId ];
}

export function hasRequestedPlan( state, planId ) {
	return state.plans.fetching.hasOwnProperty( planId );
}

export function isPlanNotFound( state, planId ) {
	return some( state.plans.errors[ planId ], { status: 404 } );
}
