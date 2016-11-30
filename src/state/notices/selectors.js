/**
 * Returns an object notices, keyed by ID.
 *
 * @param  {Object} state Global state
 * @return {Object}       Notices
 */
export function getNotices( state ) {
	return state.notices.items;
}

/**
 * Returns a notice object.
 *
 * @param  {Object} state    Global state
 * @param  {Number} noticeId Notice ID
 * @return {Object}          Notice object
 */
export function getNotice( state, noticeId ) {
	return getNotices( state )[ noticeId ];
}
