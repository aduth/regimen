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
import Root from 'components/layout/root';
import { initializeRemoteSync } from 'db';
import iosStandalone from 'lib/ios-standalone';

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
 * Preserve iOS history
 */

iosStandalone( store );

/**
 * Render
 */

ReactDOM.render(
	<Root store={ store }>
		<Router history={ history } routes={ routes } />
	</Root>,
	document.getElementById( 'app' )
);
