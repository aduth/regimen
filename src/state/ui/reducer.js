/**
 * External dependencies
 */

import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */

import {
	WORKOUT_SET,
	PLAN_SET,
	HEADER_OPTIONS_ACTIVE_TOGGLE
} from 'state/action-types';

function planId( state = null, action ) {
	switch ( action.type ) {
		case PLAN_SET:
			state = action.payload.planId;
			break;
	}

	return state;
}

function workout( state = null, action ) {
	switch ( action.type ) {
		case WORKOUT_SET:
			state = action.payload.workout;
			break;
	}

	return state;
}

function headerOptionsActive( state = false, action ) {
	switch ( action.type ) {
		case HEADER_OPTIONS_ACTIVE_TOGGLE:
			state = ! state;
			break;
	}

	return state;
}

export default combineReducers( {
	planId,
	workout,
	headerOptionsActive
} );
