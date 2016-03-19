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

/**
 * Key-value pair of database name to global PouchDB instance.
 *
 * @type {Object}
 */
let databases = {};

/**
 * Remote mappings
 */

/**
 * Key-value pair of database name to CouchDB remote URL to which the database
 * should be replicated.
 *
 * @type {Object}
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

/**
 * Redux store instance, used to maintain state of currently syncing databases.
 *
 * @type {Object}
 */
let _store;

/**
 * PouchDB plugins
 */

PouchDB.plugin( PouchDBValidation );

/**
 * Development helpers
 */

if ( global.__DEV__ ) {
	window.PouchDB = PouchDB;
}

/**
 * For each defined database, begins replicating to defined remote under the
 * conditions that a remote does exist and the database is not already syncing.
 * This only has an effect after store has been initialized.
 */
export function sync() {
	// Cannot start sync until initialized with Redux store
	if ( ! _store ) {
		return;
	}

	const state = _store.getState();
	each( databases, ( database, name ) => {
		// If database is already syncing, continue...
		if ( ! remotes[ name ] || isDatabaseSyncing( state, name ) ) {
			return;
		}

		// Otherwise, create an instance of the remote database and fetch
		// latest document versions. If changes are received, dispatch through
		// the Redux store so that any concerned reducers can update their
		// state. Once changes have been fetched, start live replication.
		const remote = new PouchDB( remotes[ name ] );
		remote.replicate.to( database )
			.on( 'change', ( change ) => {
				_store.dispatch( receiveDatabaseSyncChange( name, change ) );
			} )
			.on( 'complete', () => {
				database.replicate.to( remote, { live: true } );
			} );

		// Toggle sync state so that this remote initialization is skipped on
		// next sync.
		_store.dispatch( toggleDatabaseSyncing( name ) );
	} );
}

/**
 * Assigns the internal module store variable and begins the sync process.
 *
 * @param {Object} store Redux store instance
 */
export function initializeRemoteSync( store ) {
	_store = store;
	sync();
}

/**
 * Returns the global PouchDB instance for the specified database name. If an
 * instance does not yet exist, it is immediately instantiated and replication
 * is reinitiated.
 *
 * @param  {String} name Database name
 * @return {Object}      PouchDB instance
 */
export function getDatabase( name ) {
	if ( ! databases[ name ] ) {
		databases[ name ] = new PouchDB( name );
		sync();
	}

	return databases[ name ];
}
