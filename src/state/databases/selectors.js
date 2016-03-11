/**
 * Returns whether the specified database is being synced.
 *
 * @param  {Object}  state    Global state
 * @param  {String}  database Database name
 * @return {Boolean}          Whether database is being synced
 */
export function isDatabaseSyncing( state, database ) {
	return !! state.databases.syncing[ database ];
}
