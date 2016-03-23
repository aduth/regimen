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
import { toggleDatabaseSyncing } from 'state/databases/actions';

/**
 * Constants
 */

/**
 * Key-value pair of database name to CouchDB remote URL to which the database
 * should be replicated.
 *
 * @type {Object}
 */
const REMOTE_URLS = {};
if ( COUCHDB_REMOTE_HOST ) {
	Object.assign( REMOTE_URLS, {
		plans: `${ COUCHDB_REMOTE_HOST }/plans`
	} );
}

/**
 * Module variables
 */

/**
 * Key-value pair of database name to global PouchDB instance.
 *
 * @type {Object}
 */
let databases = {};

/**
 * Key-value pair of database name to remote global PouchDB instance.
 *
 * @type {Object}
 */
let remotes = {};

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
	each( databases, async ( database, name ) => {
		// If database is already syncing, continue...
		if ( ! REMOTE_URLS[ name ] || isDatabaseSyncing( state, name ) ) {
			return;
		}

		// Toggle sync state so that this remote initialization is skipped on
		// next sync.
		_store.dispatch( toggleDatabaseSyncing( name ) );

		// Begin live replication to remote database
		const remote = getRemoteDatabase( name );
		database.replicate.to( remote, { live: true } );

		// If we've not yet received replicated design documents, retrieve
		// from remote. On subsequent sessions, this will already be persisted
		// locally.
		try {
			await database.get( '_design/replication' );
		} catch ( error ) {
			if ( 404 !== error.status ) {
				throw error;
			}

			remote.replicate.to( database, {
				filter: 'replication/get_docs'
			} );
		}
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

/**
 * Returns the global PouchDB instance for the specified remote database name.
 * If an instance does not yet exist and a remote URL is associated with the
 * database, it is immediately instantiated before being returned.
 *
 * @param  {String} name Database name
 * @return {Object}      Remote PouchDB instance
 */
export function getRemoteDatabase( name ) {
	if ( ! REMOTE_URLS[ name ] ) {
		return null;
	}

	if ( ! remotes[ name ] ) {
		remotes[ name ] = new PouchDB( REMOTE_URLS[ name ] );
	}

	return remotes[ name ];
}
