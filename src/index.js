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
 * Render
 */

ReactDOM.render(
	<Provider store={ store }><Root /></Provider>,
	document.getElementById( 'app' )
);
