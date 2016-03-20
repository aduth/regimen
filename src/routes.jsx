/**
 * External dependencies
 */

import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

/**
 * Internal dependencies
 */

import BaseRoute from 'sections/route';
import HomeRoute from 'sections/home/route';
import PlanRoute from 'sections/plan/route';
import NewPlanRoute from 'sections/new-plan/route';
import WorkoutRoute from 'sections/workout/route';
import PrivacyRoute from 'sections/privacy/route';
import SettingsRoute from 'sections/settings/route';
import NotFoundRoute from 'sections/not-found/route';

export default (
	<Route path="/" component={ BaseRoute }>
		<IndexRoute component={ HomeRoute } />
		<Route path="plan">
			<Route path="new" component={ NewPlanRoute } />
			<Route path=":planId" component={ PlanRoute }>
				<Route path="workout">
					<Route path=":workout" component={ WorkoutRoute } />
					<IndexRedirect to="/plan/:planId/workout/1" />
				</Route>
				<IndexRedirect to="/plan/:planId/workout/1" />
			</Route>
		</Route>
		<Route path="privacy" component={ PrivacyRoute } />
		<SettingsRoute path="settings" component={ SettingsRoute } />
		<Route path="*" component={ NotFoundRoute }/>
	</Route>
);
