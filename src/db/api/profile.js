/**
 * External dependencies
 */

import debounce from 'lodash/debounce';
import merge from 'lodash/merge';

/**
 * Internal dependencies
 */

import { getDatabase } from 'db';

/**
 * A runtime-initialized closure for queueing validated put requests to the
 * profile document, finally invoking the put with a merged profile after the
 * current call stack resolves.
 *
 * @type {Function} Debounced validated put
 */
export const queueValidatingPut = ( () => {
	let queue = [];

	/**
	 * Debounced queue resolver, invoking the validated put and resetting the
	 * queue array.
	 *
	 * @type {Function} Debounced queue resolver
	 */
	const resolveQueue = debounce( () => {
		const profile = queue.reduce( ( memo, queueItem ) => {
			return merge( memo, queueItem.profile );
		}, {} );

		getDatabase( 'profile' ).validatingPut( profile ).then( () => {
			queue.forEach( ( { resolve } ) => resolve() );
			queue = [];
		} );
	} );

	/**
	 * Queues a profile put request for the specified profile document.
	 *
	 * @param  {Object}  profile Updated profile
	 * @return {Promise}         Promise to resolve when put finishes
	 */
	return async function( profile ) {
		return new Promise( ( resolve ) => {
			queue.push( { profile, resolve } );
			resolveQueue();
		} );
	};
} )();

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
			return {
				_id: 'profile',
				plans: [],
				progress: {}
			};
		}

		throw error;
	}
}
