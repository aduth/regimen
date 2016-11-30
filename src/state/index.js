/**
 * External dependencies
 */

import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */

import reducer from './reducer';
import { analytics, pageView, routing, trackProfilePlans } from './middlewares';

/**
 * Returns a Redux store instance with application-specific middleware applied.
 *
 * @return {Object} Redux store instance
 */
export function createReduxStore() {
	const middlewares = [ thunk, routing, trackProfilePlans ];

	if ( global.ga ) {
		middlewares.push(
			analytics( global.ga ),
			pageView( global.ga )
		);
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
