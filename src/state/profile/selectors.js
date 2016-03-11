/**
 * Returns whether a request is currently in progress for the profile.
 *
 * @param  {Object}  state Global state
 * @return {Boolean}       Whether request is in progress
 */
export function isRequestingProfile( state ) {
	return state.profile.fetching;
}

/**
 * Returns an array of plans for the profile.
 *
 * @param  {Object} state Global state
 * @return {Array}        Profile plans
 */
export function getProfilePlans( state ) {
	return state.profile.plans;
}

/**
 * Returns the profile workout progress for a specified plan.
 *
 * @param  {Object}  state  Global state
 * @param  {String}  planId Plan ID
 * @return {?Number}        Workout progress
 */
export function getProfilePlanProgress( state, planId ) {
	return state.profile.progress[ planId ];
}
