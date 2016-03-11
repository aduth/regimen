/**
 * Returns the current plan ID.
 *
 * @param  {Object}  state Global state
 * @return {?String}       Current plan ID
 */
export function getPlanId( state ) {
	return state.ui.planId;
}

/**
 * Returns the current workout.
 *
 * @param  {Object}  state Global state
 * @return {?Number}       Current workout
 */
export function getWorkout( state ) {
	return state.ui.workout;
}

/**
 * Returns whether header options are active.
 *
 * @param  {Object}  state Global state
 * @return {Boolean}       Header options active
 */
export function isHeaderOptionsActive( state ) {
	return state.ui.headerOptionsActive;
}
