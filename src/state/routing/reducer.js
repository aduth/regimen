/**
 * External dependencies
 */

import { routeReducer } from 'redux-simple-router';
import assign from 'lodash/assign';

import { PLAN_CREATE_SUCCESS } from 'state/action-types';

export default function routing( state, action ) {
	switch ( action.type ) {
		case PLAN_CREATE_SUCCESS:
			state = assign( {}, state, {
				path: `/plan/${ action.payload.plan._id }`
			} );
			break;
	}

	return routeReducer( state, action );
}
