/**
 * Internal dependencies
 */

import { DATABASES_TOGGLE_SYNCING } from 'state/action-types';

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
