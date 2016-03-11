/**
 * External dependencies
 */

import { combineReducers } from 'redux';
import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */

import {
	DATABASES_RECEIVE_SYNC_CHANGE,
	PLAN_EDIT,
	PLAN_RECEIVE,
	PLAN_REMOVE,
	PLAN_REQUEST,
	PLAN_REQUEST_SUCCESS,
	PLAN_REQUEST_FAILURE
} from 'state/action-types';

/**
 * Returns the updated plans fetching state after an action has been
 * dispatched.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
function fetching( state = {}, action ) {
	switch ( action.type ) {
		case PLAN_REQUEST:
		case PLAN_REQUEST_SUCCESS:
		case PLAN_REQUEST_FAILURE:
			state = {
				...state,
				[ action.payload.planId ]: PLAN_REQUEST === action.type
			};
			break;
	}

	return state;
}

/**
 * Returns the updated plans error state after an action has been dispatched.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
function errors( state = {}, action ) {
	switch ( action.type ) {
		case PLAN_REQUEST_FAILURE:
			state = {
				...state,
				[ action.payload.planId ]: [
					...( state[ action.payload.planId ] || [] ),
					action.error
				]
			};
			break;

		case DATABASES_RECEIVE_SYNC_CHANGE:
			const { database, change } = action.payload;
			if ( 'plans' === database ) {
				state = omit( state, map( change.docs, '_id' ) );
			}
			break;
	}

	return state;
}

/**
 * Returns the updated plan items state after an action has been dispatched.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
function items( state = {}, action ) {
	switch ( action.type ) {
		case PLAN_RECEIVE:
			state = {
				...state,
				[ action.payload.plan._id ]: action.payload.plan
			};
			break;

		case DATABASES_RECEIVE_SYNC_CHANGE:
			if ( 'plans' !== action.payload.database ) {
				break;
			}

			state = {
				...state,
				...keyBy( action.payload.change.docs, '_id' )
			};
			break;

		case PLAN_EDIT:
			state = {
				...state,
				[ action.payload.planId ]: {
					...state[ action.payload.planId ],
					...action.payload.attributes
				}
			};
			break;

		case PLAN_REMOVE:
			state = omit( state, [ action.payload.plan._id ] );
			break;
	}

	return state;
}

export default combineReducers( {
	fetching,
	errors,
	items
} );
