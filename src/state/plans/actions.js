/**
 * Internal dependencies
 */

import { getDatabase } from 'db';
import {
	PLAN_CREATE,
	PLAN_EDIT,
	PLAN_RECEIVE,
	PLAN_REMOVE,
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

export function receivePlan( plan ) {
	return {
		type: PLAN_RECEIVE,
		payload: { plan }
	};
}

export function removePlan( plan ) {
	return {
		type: PLAN_REMOVE,
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
				payload: { id }
			} );
			dispatch( receivePlan( plan ) );
		} catch ( error ) {
			dispatch( {
				type: PLAN_REQUEST_FAILURE,
				payload: { id },
				error
			} );
		}
	};
}

export function editPlan( planId, attributes ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PLAN_EDIT,
			payload: { planId, attributes }
		} );

		const db = getDatabase( 'plans' );
		let originalPlan;
		try {
			originalPlan = await db.get( planId );
		} catch ( error ) {
			return;
		}

		try {
			await db.validatingPut( Object.assign( {}, originalPlan, attributes ) );
			dispatch( receivePlan( await db.get( planId ) ) );
		} catch ( error ) {
			dispatch( receivePlan( originalPlan ) );
		}
	};
}
