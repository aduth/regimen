/**
 * External dependencies
 */

import { combineReducers } from 'redux';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */

import { NOTICE_ADD, NOTICE_REMOVE } from 'state/action-types';

/**
 * Returns the updated notice next ID state after an action has been
 * dispatched.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
function nextId( state = 0, action ) {
	switch ( action.type ) {
		case NOTICE_ADD:
			state++;
			break;
	}

	return state;
}

/**
 * Returns the updated notice items state after an action has been dispatched.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
function items( state = {}, action ) {
	switch ( action.type ) {
		case NOTICE_ADD:
			state = Object.assign( {}, state, {
				[ action.payload.id ]: omit( action.payload, 'id' )
			} );
			break;

		case NOTICE_REMOVE:
			state = omit( state, action.payload.noticeId );
			break;
	}

	return state;
}

export default combineReducers( {
	nextId,
	items
} );
