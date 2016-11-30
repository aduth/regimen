/**
 * External dependencies
 */

import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */

import {
	HEADER_OPTIONS_ACTIVE_TOGGLE
} from 'state/action-types';

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
	headerOptionsActive
} );
