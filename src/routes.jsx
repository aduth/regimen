/**
 * External dependencies
 */

import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

/**
 * Internal dependencies
 */

import BaseRoute from 'components/sections/route';
import HomeRoute from 'components/sections/home/route';
import PlanRoute from 'components/sections/plan/route';
import NewPlanRoute from 'components/sections/new-plan/route';
import WorkoutRoute from 'components/sections/workout/route';
import SettingsRoute from 'components/sections/settings/route';
import NotFoundRoute from 'components/sections/not-found/route';

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
		<SettingsRoute path="settings" component={ SettingsRoute } />
		<Route path="*" component={ NotFoundRoute }/>
	</Route>
];
