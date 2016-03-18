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

	if ( 'object' === typeof window && window.ga ) {
		middlewares = [
			...middlewares,
			analytics( window.ga ),
			pageView( window.ga )
		];
	}

	let createStoreWithMiddleware = applyMiddleware( ...middlewares );

	if ( __DEV__ && 'object' === typeof window && window.devToolsExtension ) {
		createStoreWithMiddleware = compose(
			createStoreWithMiddleware,
			window.devToolsExtension()
		);
	}

	return createStoreWithMiddleware( createStore )( reducer );
}
