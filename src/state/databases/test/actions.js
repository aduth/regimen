/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import { DATABASES_TOGGLE_SYNCING } from 'state/action-types';
import { toggleDatabaseSyncing } from '../actions';

describe( 'actions', () => {
	describe( '#toggleDatabaseSyncing', () => {
		it( 'should return an action object', () => {
			const action = toggleDatabaseSyncing( 'profile' );

			expect( action ).to.eql( {
				type: DATABASES_TOGGLE_SYNCING,
				payload: {
					database: 'profile'
				}
			} );
		} );
	} );
} );
