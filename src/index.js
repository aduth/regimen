/**
 * External dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { install as installOfflineRuntime } from 'offline-plugin/runtime';

/**
 * Internal dependencies
 */

import { createReduxStore } from 'state';
import routes from 'routes';
import Root from 'layout/root';
import { initializeRemoteSync } from 'db';
import configureStandalone from 'lib/standalone';

/**
 * Stylesheets
 */

import 'assets/stylesheets/main.scss';

/**
 * Store initialization
 */

const store = createReduxStore();
const history = syncHistoryWithStore( browserHistory, store );
initializeRemoteSync( store );

/**
 * Offline capability
 */

if ( ! __DEV__ ) {
	installOfflineRuntime();
}

/**
 * Standalone navigator compatibility
 */

configureStandalone( store );

/**
 * Render
 */

ReactDOM.render(
	<Root store={ store }>
		<Router history={ history } routes={ routes } />
	</Root>,
	document.getElementById( 'app' )
);
