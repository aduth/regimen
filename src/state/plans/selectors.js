/**
 * External dependencies
 */

import some from 'lodash/some';

/**
 * Internal dependencies
 */

import * as routines from 'routines';

/**
 * Returns a plan object.
 *
 * @param  {Object} state  Global state
 * @param  {String} planId Plan ID
 * @return {Object}        Plan
 */
export function getPlan( state, planId ) {
	return state.plans.items[ planId ];
}

/**
 * Returns a plan's routine object.
 *
 * @param  {Object} state  Global state
 * @param  {String} planId Plan ID
 * @return {Object}        Routine
 */
export function getPlanRoutine( state, planId ) {
	const plan = getPlan( state, planId );
	if ( ! plan || ! routines[ plan.routine ] ) {
		return null;
	}

	return routines[ plan.routine ];
}

/**
 * Returns whether a request for a plan is currently in progress.
 *
 * @param  {Object}  state  Global state
 * @param  {String}  planId Plan ID
 * @return {Boolean}        Whether request is in progress
 */
export function isRequestingPlan( state, planId ) {
	return state.plans.fetching[ planId ];
}

/**
 * Returns whether the plan had not been found in the last request.
 *
 * @param  {Object}  state  Global state
 * @param  {String}  planId Plan ID
 * @return {Boolean}        Whether plan is not found
 */
export function isPlanNotFound( state, planId ) {
	return some( state.plans.errors[ planId ], { status: 404 } );
}
