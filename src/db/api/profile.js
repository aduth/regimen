/**
 * Internal dependencies
 */

import { getDatabase } from 'db';

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
