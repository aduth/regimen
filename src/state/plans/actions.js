/**
 * External dependencies
 */

import shortid from 'shortid';

/**
 * Internal dependencies
 */

import { getDatabase } from 'db';
import { setWorkoutRoute } from 'state/routing/actions';
import {
	PLAN_CREATE,
	PLAN_CREATE_SUCCESS,
	PLAN_EDIT,
	PLAN_RECEIVE,
	PLAN_REMOVE,
	PLAN_REQUEST,
	PLAN_REQUEST_SUCCESS,
	PLAN_REQUEST_FAILURE
} from 'state/action-types';

/**
 * Returns an action thunk, dispatching progress of an attempt to create a new
 * plan.
 *
 * @param  {Object}   plan Plan to create
 * @return {Function}      Action thunk
 */
export function createPlan( plan ) {
	return async ( dispatch ) => {
		plan._id = shortid();

		dispatch( {
			type: PLAN_CREATE,
			payload: { plan }
		} );

		const db = getDatabase( 'plans' );

		try {
			await db.validatingPut( plan );
			dispatch( receivePlan( await db.get( plan._id ) ) );
			dispatch( setWorkoutRoute( plan._id, 1 ) );
			dispatch( {
				type: PLAN_CREATE_SUCCESS,
				payload: { plan }
			} );
		} catch ( error ) {
			dispatch( removePlan( plan ) );
		}
	};
}

/**
 * Returns an action object signalling that a plan object has been received.
 *
 * @param  {Object} plan Plan received
 * @return {Object}      Action object
 */
export function receivePlan( plan ) {
	return {
		type: PLAN_RECEIVE,
		payload: { plan }
	};
}

/**
 * Returns an action object signalling that a plan object has been removed.
 *
 * @param  {Object} plan Plan removed
 * @return {Object}      Action object
 */
export function removePlan( plan ) {
	return {
		type: PLAN_REMOVE,
		payload: { plan }
	};
}

/**
 * Returns an action thunk, dispatching progress of an attempt to request a
 * plan.
 *
 * @param  {String}   planId Plan to request
 * @return {Function}        Action thunk
 */
export function requestPlan( planId ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PLAN_REQUEST,
			payload: { planId }
		} );

		try {
			const plan = await getDatabase( 'plans' ).get( planId );
			dispatch( {
				type: PLAN_REQUEST_SUCCESS,
				payload: { planId }
			} );
			dispatch( receivePlan( plan ) );
		} catch ( error ) {
			dispatch( {
				type: PLAN_REQUEST_FAILURE,
				payload: { planId },
				error
			} );
		}
	};
}

/**
 * Returns an action thunk, dispatching progress of an attempt to edit a plan.
 *
 * @param  {String}   planId     Plan to edit
 * @param  {Object}   attributes Attribute revisions
 * @return {Function}            Action thunk
 */
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
