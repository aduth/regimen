/**
 * External dependencies
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Internal dependencies
 */

import {
	WORKOUT_SET,
	PLAN_SET,
	HEADER_OPTIONS_ACTIVE_TOGGLE
} from 'state/action-types';

/**
 * Returns the updated plan ID state after an action has been dispatched.
 *
 * @param  {?String} state  Current state
 * @param  {Object}  action Action object
 * @return {?String}        Updated state
 */
function planId( state = null, action ) {
	switch ( action.type ) {
		case PLAN_SET:
			state = action.payload.planId;
			break;

		case LOCATION_CHANGE:
			state = null;
			break;
	}

	return state;
}

/**
 * Returns the updated workout state after an action has been dispatched.
 *
 * @param  {?Number} state  Current state
 * @param  {Object}  action Action object
 * @return {?Number}        Updated state
 */
function workout( state = null, action ) {
	switch ( action.type ) {
		case WORKOUT_SET:
			state = action.payload.workout;
			break;
	}

	return state;
}

/**
 * Returns the updated header options active state after an action has been
 * dispatched.
 *
 * @param  {Boolean} state  Current state
 * @param  {Object}  action Action object
 * @return {Boolean}        Updated state
 */
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
