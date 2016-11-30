/**
 * Base title to be affixed to all titles.
 *
 * @type {String}
 */
const BASE_TITLE = 'Regimen';

export function getTitle( state ) {
	return state.documentHead.title;
}

export function getFormattedTitle( state ) {
	const title = getTitle( state );
	if ( title ) {
		return `${ title } | ${ BASE_TITLE }`;
	}

	return BASE_TITLE;
}
