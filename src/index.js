/**
 * External dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createHistory } from 'history';

/**
 * Internal dependencies
 */

import { createReduxStore } from 'state';
import routes from 'routes';
import Root from 'components/root';
import { initializeRemoteSync } from 'db';

/**
 * Stylesheets
 */

import 'assets/stylesheets/main.scss';

/**
 * Store initialization
 */

const history = createHistory();
const store = createReduxStore( history );
initializeRemoteSync( store );

/**
 * Render
 */

ReactDOM.render(
	<Root store={ store }>
		<Router history={ history } routes={ routes } />
	</Root>,
	document.getElementById( 'app' )
);
