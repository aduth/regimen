/**
 * External dependencies
 */

import PouchDB from 'pouchdb';
import each from 'lodash/collection/each';

/**
 * Internal dependencies
 */

import { isDatabaseSyncing } from 'state/databases/selectors';
import {
	toggleDatabaseSyncing,
	receiveDatabaseSyncChange
} from 'state/databases/actions';

/**
 * Databases
 */

let databases = {};

/**
 * Remote mappings
 */

const remotes = {
	plans: 'https://regimenapp.cloudant.com/plans'
};

/**
 * Module variables
 */

let _store;

/**
 * Development helpers
 */

if ( __DEV__ ) {
	window.PouchDB = PouchDB;
}

export function sync() {
	if ( ! _store ) {
		return;
	}

	const state = _store.getState();
	each( databases, ( database, name ) => {
		if ( ! remotes[ name ] || isDatabaseSyncing( state, name ) ) {
			return;
		}

		database.sync( new PouchDB( remotes[ name ] ), {
			live: true
		} ).on( 'change', function( change ) {
			if ( 'pull' !== change.direction ) {
				return;
			}

			_store.dispatch( receiveDatabaseSyncChange( name, change.change ) );
		} );

		_store.dispatch( toggleDatabaseSyncing( name ) );
	} );
}

export function initializeRemoteSync( store ) {
	_store = store;
	sync();
}

export function getDatabase( name ) {
	if ( ! databases[ name ] ) {
		databases[ name ] = new PouchDB( name );
		sync();
	}

	return databases[ name ];
}
