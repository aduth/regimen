/**
 * External dependencies
 */

import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */

import reducer from './reducer';
import middlewares from './middlewares';

/**
 * Returns a Redux store instance with application-specific middleware applied.
 *
 * @return {Object} Redux store instance
 */
export function createReduxStore() {
	let createStoreWithMiddleware = applyMiddleware( ...middlewares );

	if ( global.__DEV__ && global.devToolsExtension ) {
		createStoreWithMiddleware = compose(
			createStoreWithMiddleware,
			global.devToolsExtension()
		);
	}

	const store = createStoreWithMiddleware( createStore )( reducer );

	if ( global.__DEV__ ) {
		global.store = store;
	}

	return store;
}
