/**
 * External dependencies
 */

import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

/**
 * Internal dependencies
 */

import BaseRoute from 'components/base-route';
import HomeRoute from 'components/home-route';
import PlanRoute from 'components/plan-route';
import NewPlanRoute from 'components/new-plan-route';
import WorkoutRoute from 'components/workout-route';

export default [
	<Route path="/" component={ BaseRoute }>
		<IndexRoute component={ HomeRoute } />
		<Route path="plan">
			<Route path="new" component={ NewPlanRoute } />
			<Route path=":planId" component={ PlanRoute }>
				<Route path="workout/:workout" component={ WorkoutRoute } />
				<IndexRedirect to="/plan/:planId/workout/1" />
			</Route>
		</Route>
	</Route>
];
