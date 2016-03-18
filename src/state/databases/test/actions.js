/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import {
	DATABASES_TOGGLE_SYNCING,
	DATABASES_RECEIVE_SYNC_CHANGE
} from 'state/action-types';
import {
	toggleDatabaseSyncing,
	receiveDatabaseSyncChange
} from '../actions';

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

	describe( '#receiveDatabaseSyncChange', () => {
		it( 'should return an action object', () => {
			const action = receiveDatabaseSyncChange( 'profile', { docs: [] } );

			expect( action ).to.eql( {
				type: DATABASES_RECEIVE_SYNC_CHANGE,
				payload: {
					database: 'profile',
					change: { docs: [] }
				}
			} );
		} );
	} );
} );
