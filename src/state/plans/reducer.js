/**
 * External dependencies
 */

import { combineReducers } from 'redux';
import indexBy from 'lodash/collection/indexBy';

/**
 * Internal dependencies
 */

import {
	DATABASES_RECEIVE_SYNC_CHANGE,
	PLAN_EDIT,
	PLAN_RECEIVE,
	PLAN_REQUEST,
	PLAN_REQUEST_SUCCESS,
	PLAN_REQUEST_FAILURE
} from 'state/action-types';

function fetching( state = {}, action ) {
	switch ( action.type ) {
		case PLAN_REQUEST:
		case PLAN_REQUEST_SUCCESS:
		case PLAN_REQUEST_FAILURE:
			state = {
				...state,
				[ action.payload.id ]: PLAN_REQUEST === action.type
			};
			break;
	}

	return state;
}

function errors( state = {}, action ) {
	switch ( action.type ) {
		case PLAN_REQUEST_FAILURE:
			const { id } = action.payload;
			state = {
				...state,
				[ id ]: [ ...( state[ id ] || [] ), action.error ]
			};
			break;
	}

	return state;
}

function items( state = {}, action ) {
	switch ( action.type ) {
		case PLAN_RECEIVE:
			const { plan } = action.payload;
			state = {
				...state,
				[ plan._id ]: plan
			};
			break;

		case DATABASES_RECEIVE_SYNC_CHANGE:
			const { database, change } = action.payload;
			if ( 'plans' !== database ) {
				break;
			}

			state = {
				...state,
				...indexBy( change.docs, '_id' )
			};
			break;

		case PLAN_EDIT:
			const { planId, attributes } = action.payload;
			state = {
				...state,
				[ planId ]: {
					...state[ planId ],
					...attributes
				}
			};
			break;
	}

	return state;
}

export default combineReducers( {
	fetching,
	errors,
	items
} );
