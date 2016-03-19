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
import { analytics, pageView } from './middlewares';

/**
 * Returns a Redux store instance with application-specific middleware applied.
 *
 * @return {Object} Redux store instance
 */
export function createReduxStore() {
	let middlewares = [
		routerMiddleware( browserHistory ),
		thunkMiddleware
	];

	if ( global.ga ) {
		middlewares = [
			...middlewares,
			analytics( global.ga ),
			pageView( global.ga )
		];
	}

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
