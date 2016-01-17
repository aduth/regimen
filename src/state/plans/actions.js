/**
 * Internal dependencies
 */

import { getDatabase } from 'db';
import {
	PLAN_CREATE,
	PLAN_REQUEST,
	PLAN_REQUEST_SUCCESS,
	PLAN_REQUEST_FAILURE
} from 'state/action-types';

export function createPlan( plan ) {
	return {
		type: PLAN_CREATE,
		payload: { plan }
	};
}

export function requestPlan( id ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PLAN_REQUEST,
			payload: { id }
		} );

		try {
			const plan = await getDatabase( 'plans' ).get( id );
			dispatch( {
				type: PLAN_REQUEST_SUCCESS,
				payload: { plan }
			} );
		} catch ( error ) {
			dispatch( {
				type: PLAN_REQUEST_FAILURE,
				payload: { id },
				error
			} );
		}
	};
}
