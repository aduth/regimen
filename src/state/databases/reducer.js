/**
 * External dependencies
 */

import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */

import { DATABASES_TOGGLE_SYNCING } from 'state/action-types';

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
