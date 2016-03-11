/**
 * Internal dependencies
 */

import {
	DATABASES_TOGGLE_SYNCING,
	DATABASES_RECEIVE_SYNC_CHANGE
} from 'state/action-types';

/**
 * Returns an action object signalling that the syncing status for the
 * specified databse should be toggled.
 *
 * @param  {String} database Database name
 * @return {Object}          Action object
 */
export function toggleDatabaseSyncing( database ) {
	return {
		type: DATABASES_TOGGLE_SYNCING,
		payload: { database }
	};
}

/**
 * Returns an action object signalling that sync updates have been received for
 * the specified database.
 *
 * @param  {String} database Database name
 * @param  {Object} change   Change payload object
 * @return {Object}          Action object
 */
export function receiveDatabaseSyncChange( database, change ) {
	return {
		type: DATABASES_RECEIVE_SYNC_CHANGE,
		payload: { database, change }
	};
}
