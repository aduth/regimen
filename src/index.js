/**
 * External dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { install as installOfflineRuntime } from 'offline-plugin/runtime';

/**
 * Internal dependencies
 */

import { createReduxStore } from 'state';
import Root from 'layout/root';
import { initializeRemoteSync } from 'db';
import configureStandalone from 'lib/standalone';
import FastClick from 'fastclick';

/**
 * Stylesheets
 */

import 'assets/stylesheets/main.scss';

/**
 * Store initialization
 */

const store = createReduxStore();
initializeRemoteSync( store );
configureStandalone( store );

/**
 * Offline capability
 */

if ( ! global.__DEV__ ) {
	installOfflineRuntime();
}

/**
 * FastClick
 */

FastClick.attach( document.body );

/**
 * Render
 */

ReactDOM.render(
	<Provider store={ store }><Root /></Provider>,
	document.getElementById( 'app' )
);
