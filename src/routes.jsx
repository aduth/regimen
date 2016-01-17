/**
 * External dependencies
 */

import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

/**
 * Internal dependencies
 */

import BaseRoute from 'components/base-route';
import HomeRoute from 'components/home-route';
import PlanRoute from 'components/plan-route';
import WorkoutRoute from 'components/workout-route';

export default [
	<Route path="/" component={ BaseRoute }>
		<IndexRoute component={ HomeRoute } />
		<Route path="plan" component={ PlanRoute }>
			<Route path=":planId/workout/:workout" component={ WorkoutRoute } />
			<Redirect from=":planId" to="/plan/:planId/workout/1" />
		</Route>
	</Route>
];
