/**
 * Internal dependencies
 */

import {
	DATABASES_TOGGLE_SYNCING,
	DATABASES_RECEIVE_SYNC_CHANGE
} from 'state/action-types';

export function toggleDatabaseSyncing( database ) {
	return {
		type: DATABASES_TOGGLE_SYNCING,
		payload: { database }
	};
}

export function receiveDatabaseSyncChange( database, change ) {
	return {
		type: DATABASES_RECEIVE_SYNC_CHANGE,
		payload: { database, change }
	};
}
