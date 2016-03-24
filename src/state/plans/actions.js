/**
 * External dependencies
 */

import shortid from 'shortid';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */

import { getDatabase, getRemoteDatabase } from 'db';
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
 * Constants
 */

/**
 * CouchDB special document field keys, to be stripped from any created plan so
 * as not to introduce conflicts.
 *
 * @see  https://wiki.apache.org/couchdb/HTTP_Document_API
 * @type CouchDB special document fields
 */
const COUCHDB_SPECIAL_FIELDS = [
	'_id',
	'_rev',
	'_attachments',
	'_deleted',
	'_revisions',
	'_revs_info',
	'_conflicts',
	'_deleted_conflicts',
	'_local_seq'
];

/**
 * Returns an action thunk, dispatching progress of an attempt to create a new
 * plan.
 *
 * @param  {Object}   plan Plan to create
 * @return {Function}      Action thunk
 */
export function createPlan( plan ) {
	return async ( dispatch ) => {
		plan = omit( plan, COUCHDB_SPECIAL_FIELDS );
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

		for ( let getImpl of [ getDatabase, getRemoteDatabase ] ) {
			const isLocal = ( getDatabase === getImpl );

			try {
				// Retrieve document and transform to formatted entity
				let plan = await getImpl( 'plans' ).get( planId );
				plan = omit( plan, COUCHDB_SPECIAL_FIELDS );
				plan._id = planId;

				// If we've reached this point, then we can assume there was
				// success in retrieving the document. This may be local or
				// remote, depending on whether the document is cached.
				dispatch( receivePlan( plan ) );

				// If the document has not been cached locally, we'll replicate
				// from remote. Note that while PouchDB supports replication
				// from an array of document IDs, our current host (Cloudant)
				// does not support these types of requests, so we use a filter
				// document instead.
				if ( ! isLocal ) {
					getImpl( 'plans' ).replicate.to( getDatabase( 'plans' ), {
						filter: 'replication/get_by_id',
						query_params: {
							_id: planId
						}
					} );
				}

				// Only after the document has been saved locally do we want
				// to indicate success, as otherwise we might face a race
				// condition where a subsequent request is still not cached.
				dispatch( {
					type: PLAN_REQUEST_SUCCESS,
					payload: { planId }
				} );

				break;
			} catch ( error ) {
				if ( 404 !== error.status ) {
					dispatch( {
						type: PLAN_REQUEST_FAILURE,
						payload: { planId },
						error
					} );
				}
			}
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
