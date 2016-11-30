/**
 * External dependencies
 */

import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */

import { default as routing } from './routing/middleware';
import { trackProfilePlans } from './profile/middleware';
import { analytics, pageView } from './analytics/middleware';

const middlewares = [ thunk, routing, trackProfilePlans ];
if ( global.ga ) {
	middlewares.push(
		analytics( global.ga ),
		pageView( global.ga )
	);
}

export default middlewares;
