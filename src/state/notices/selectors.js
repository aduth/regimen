/**
 * Returns an object notices, keyed by ID.
 *
 * @param  {Object} state Global state
 * @return {Object}       Notices
 */
export function getNotices( state ) {
	return state.notices.items;
}
