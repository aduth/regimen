/**
 * External dependencies
 */

import PouchDB from 'pouchdb';
import PouchDBValidation from 'pouchdb-validation';
import each from 'lodash/each';

/**
 * Internal dependencies
 */

import { COUCHDB_REMOTE_HOST } from 'config';
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

const remotes = {};
if ( COUCHDB_REMOTE_HOST ) {
	Object.assign( remotes, {
		plans: `${ COUCHDB_REMOTE_HOST }/plans`
	} );
}

/**
 * Module variables
 */

let _store;

/**
 * PouchDB plugins
 */
PouchDB.plugin( PouchDBValidation );

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

		const remote = new PouchDB( remotes[ name ] );
		remote.replicate.to( database )
			.on( 'change', ( change ) => {
				_store.dispatch( receiveDatabaseSyncChange( name, change ) );
			} )
			.on( 'complete', () => {
				database.replicate.to( remote, { live: true } );
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
