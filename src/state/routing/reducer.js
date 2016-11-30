/**
 * External dependencies
 */

import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */

import { ROUTE_PATH_PUSH, ROUTE_PATH_REPLACE } from 'state/action-types';

/**
 * Returns the updated path fetching state after an action has been dispatched.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
export function path( state, action ) {
	if ( undefined === state ) {
		const { pathname, search } = window.location;
		state = pathname + search;
	}

	switch ( action.type ) {
		case ROUTE_PATH_PUSH:
		case ROUTE_PATH_REPLACE:
			return action.path;
	}

	return state;
}

export default combineReducers( {
	path
} );
