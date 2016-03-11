/**
 * Internal dependencies
 */

import {
	WORKOUT_SET,
	PLAN_SET,
	HEADER_OPTIONS_ACTIVE_TOGGLE
} from 'state/action-types';

/**
 * Returns an action object signalling that the current workout should be set
 * to the specified value.
 *
 * @param  {Number} workout Workout
 * @return {Object}         Action object
 */
export function setWorkout( workout ) {
	return {
		type: WORKOUT_SET,
		payload: { workout }
	};
}

/**
 * Returns an action object signalling that the current plan ID should be set
 * to the specified value.
 *
 * @param  {String} planId Plan ID
 * @return {Object}        Action object
 */
export function setPlanId( planId ) {
	return {
		type: PLAN_SET,
		payload: { planId }
	};
}

/**
 * Returns an action object signalling that the header options active state
 * should be toggled.
 *
 * @return {Object} Action object
 */
export function toggleHeaderOptionsActive() {
	return {
		type: HEADER_OPTIONS_ACTIVE_TOGGLE
	};
}
