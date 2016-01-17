/**
 * External dependencies
 */

import { compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncReduxAndRouter } from 'redux-simple-router';

/**
 * Internal dependencies
 */

import reducer from './reducer';

/**
 * Store initialization
 */

export function createReduxStore( history ) {
	let createStoreWithMiddleware = compose(
		applyMiddleware( thunkMiddleware )
	);

	if ( __DEV__ && 'object' === typeof window && window.devToolsExtension ) {
		createStoreWithMiddleware = compose(
			createStoreWithMiddleware,
			window.devToolsExtension()
		);
	}

	const store = createStoreWithMiddleware( createStore )( reducer );
	syncReduxAndRouter( history, store );
	return store;
}
