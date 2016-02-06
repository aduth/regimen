/**
 * External dependencies
 */

import { combineReducers } from 'redux';
import omit from 'lodash/object/omit';
import without from 'lodash/array/without';

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

function profile( state = null, action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_UPDATE_SUCCESS:
			state = action.payload.profile;
			break;

		case PROFILE_PLAN_ADD:
			if ( state ) {
				const { planId } = action.payload;
				state.plans = [ planId ].concat( without( state.plans, planId ) );
			}
			break;

		case PROFILE_PLAN_REMOVE:
			if ( state ) {
				const { planId } = action.payload;
				state.plans = without( state.plans, planId );
			}
			break;
	}

	return state;
}

export default combineReducers( {
	fetching,
	progress,
	profile
} );
