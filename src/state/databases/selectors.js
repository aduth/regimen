export function isDatabaseSyncing( state, database ) {
	return !! state.databases.syncing[ database ];
}
