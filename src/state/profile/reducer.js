/**
 * External dependencies
 */

import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import without from 'lodash/without';

/**
 * Internal dependencies
 */

import {
	PROFILE_PLAN_ADD,
	PROFILE_PLAN_PROGRESS_SET,
	PROFILE_PLAN_REMOVE,
	PROFILE_REQUEST,
	PROFILE_REQUEST_SUCCESS,
	PROFILE_REQUEST_FAILURE,
	PROFILE_UPDATE_SUCCESS
} from 'state/action-types';

function fetching( state = false, action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST:
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_REQUEST_FAILURE:
			state = PROFILE_REQUEST === action.type;
			break;
	}

	return state;
}

function progress( state = {}, action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_UPDATE_SUCCESS:
			state = action.payload.profile.progress;
			break;

		case PROFILE_PLAN_PROGRESS_SET:
			const { planId, workout } = action;
			state = Object.assign( {}, state, {
				[ planId ]: workout
			} );
			break;

		case PROFILE_PLAN_REMOVE:
			state = omit( state, action.planId );
			break;
	}

	return state;
}

function plans( state = [], action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_UPDATE_SUCCESS:
			state = action.payload.profile.plans;
			break;

		case PROFILE_PLAN_ADD:
			const { planId } = action.payload;
			state.plans = [ planId ].concat( without( state.plans, planId ) );
			break;

		case PROFILE_PLAN_REMOVE:
			state.plans = without( state.plans, action.payload.planId );
			break;
	}

	return state;
}

export default combineReducers( {
	fetching,
	progress,
	plans
} );
