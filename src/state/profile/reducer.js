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
	PROFILE_UPDATE,
	PROFILE_UPDATE_SUCCESS
} from 'state/action-types';

/**
 * Returns the updated profile fetching state after an action has been
 * dispatched.
 *
 * @param  {Boolean} state  Current state
 * @param  {Object}  action Action object
 * @return {Boolean}        Updated state
 */
export function fetching( state = false, action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST:
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_REQUEST_FAILURE:
			state = PROFILE_REQUEST === action.type;
			break;
	}

	return state;
}

/**
 * Returns the updated profile progress state after an action has been
 * dispatched.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
export function progress( state = {}, action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_UPDATE_SUCCESS:
		case PROFILE_UPDATE:
			if ( 'progress' in action.payload.profile ) {
				state = action.payload.profile.progress;
			}
			break;

		case PROFILE_PLAN_PROGRESS_SET:
			const { planId, workout } = action.payload;
			state = Object.assign( {}, state, {
				[ planId ]: workout
			} );
			break;

		case PROFILE_PLAN_REMOVE:
			state = omit( state, action.payload.planId );
			break;
	}

	return state;
}

/**
 * Returns the updated profile plans state after an action has been
 * dispatched.
 *
 * @param  {Array}  state  Current state
 * @param  {Object} action Action object
 * @return {Array}         Updated state
 */
export function plans( state = [], action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_UPDATE_SUCCESS:
		case PROFILE_UPDATE:
			if ( 'plans' in action.payload.profile ) {
				state = action.payload.profile.plans;
			}
			break;

		case PROFILE_PLAN_ADD:
			const { planId } = action.payload;
			state = [ planId ].concat( without( state, planId ) );
			break;

		case PROFILE_PLAN_REMOVE:
			state = without( state, action.payload.planId );
			break;
	}

	return state;
}

/**
 * Returns the updated profile imperial unit boolean state after an action has
 * been dispatched.
 *
 * @param  {Boolean} state  Current state
 * @param  {Object}  action Action object
 * @return {Boolean}        Updated state
 */
export function imperial( state = true, action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_UPDATE_SUCCESS:
		case PROFILE_UPDATE:
			if ( 'imperial' in action.payload.profile ) {
				return action.payload.profile.imperial;
			}
	}

	return state;
}

/**
 * Returns the updated profile minimum plate weight state after an action has
 * been dispatched.
 *
 * @param  {Number} state  Current state
 * @param  {Object} action Action object
 * @return {Number}        Updated state
 */
export function minPlate( state = 2.5, action ) {
	switch ( action.type ) {
		case PROFILE_REQUEST_SUCCESS:
		case PROFILE_UPDATE_SUCCESS:
		case PROFILE_UPDATE:
			if ( 'minPlate' in action.payload.profile ) {
				return action.payload.profile.minPlate;
			}
	}

	return state;
}

export default combineReducers( {
	fetching,
	progress,
	plans,
	imperial,
	minPlate
} );
