/**
 * External dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/**
 * Internal dependencies
 */

import { createReduxStore } from 'state';
import Root from 'components/root';
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
