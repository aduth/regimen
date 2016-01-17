/**
 * Internal dependencies
 */

import {
	WORKOUT_SET,
	PLAN_SET,
	HEADER_OPTIONS_ACTIVE_TOGGLE
} from 'state/action-types';

export function setWorkout( workout ) {
	return {
		type: WORKOUT_SET,
		payload: { workout }
	};
}

export function setPlanId( planId ) {
	return {
		type: PLAN_SET,
		payload: { planId }
	};
}

export function toggleHeaderOptionsActive() {
	return {
		type: HEADER_OPTIONS_ACTIVE_TOGGLE
	};
}
