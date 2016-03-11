/**
 * External dependencies
 */

import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */

import { DATABASES_TOGGLE_SYNCING } from 'state/action-types';

/**
 * Returns the updated database syncing state after an action has been
 * dispatched.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
function syncing( state = {}, action ) {
	switch ( action.type ) {
		case DATABASES_TOGGLE_SYNCING:
			const { database } = action.payload;
			state[ database ] = ! state[ database ];
			break;
	}

	return state;
}

export default combineReducers( {
	syncing
} );
