/**
 * External dependencies
 */

import PromiseQueue from 'promise-queue';

/**
 * Internal dependencies
 */

import { getDatabase } from 'db';

/**
 * Module variables
 */

/**
 * Instance of PromiseQueue, used for managing queued profile revisions.
 *
 * @type {PromiseQueue}
 */
const _queue = new PromiseQueue( 1 );

/**
 * Queues a profile put request using the specified profile revisions. Requests
 * are queued such as to avoid a conflict error when multiple updates are made
 * during the same call stack.
 *
 * @param  {Object}  revisions Updated profile value
 * @return {Promise}           Promise to resolve when put finishes
 */
export async function queueRevisions( revisions ) {
	return new Promise( ( resolve ) => {
		_queue.add( async () => {
			const profile = {
				...( await getProfileOrDefault() ),
				...revisions
			};

			await getDatabase( 'profile' ).validatingPut( profile );
			resolve();
		} );
	} );
}

/**
 * Requests the profile document, returning the default profile if the document
 * doesn't yet exist in the database.
 *
 * @return {Promise} Promise to resolve when document received
 */
export async function getProfileOrDefault() {
	const db = getDatabase( 'profile' );

	try {
		return await db.get( 'profile' );
	} catch ( error ) {
		if ( 404 === error.status ) {
			return { _id: 'profile' };
		}

		throw error;
	}
}
