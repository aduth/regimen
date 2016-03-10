/**
 * External dependencies
 */

import { compose, applyMiddleware, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk';

/**
 * Internal dependencies
 */

import reducer from './reducer';

/**
 * Store initialization
 */

export function createReduxStore() {
	let createStoreWithMiddleware = compose(
		applyMiddleware(
			routerMiddleware( browserHistory ),
			thunkMiddleware
		)
	);

	if ( __DEV__ && 'object' === typeof window && window.devToolsExtension ) {
		createStoreWithMiddleware = compose(
			createStoreWithMiddleware,
			window.devToolsExtension()
		);
	}

	return createStoreWithMiddleware( createStore )( reducer );
}
