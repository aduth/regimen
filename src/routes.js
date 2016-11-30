/**
 * External dependencies
 */

import { parse as parseQuerystring } from 'querystring';
import pathToRegexp from 'path-to-regexp';
import { map } from 'lodash';

/**
 * Internal dependencies
 */

import HomeRoute from 'sections/home/route';
import PlanRoute from 'sections/plan/route';
import NewPlanRoute from 'sections/new-plan/route';
import WorkoutRoute from 'sections/workout/route';
import AboutRoute from 'sections/about/route';
import PrivacyRoute from 'sections/privacy/route';
import SettingsRoute from 'sections/settings/route';
import NotFoundRoute from 'sections/not-found/route';

export const routes = {
	'/': HomeRoute,
	'/plan(/new)?': NewPlanRoute,
	'/plan/:planId': PlanRoute,
	'/plan/:planId/workout/:workout': WorkoutRoute,
	'/about': AboutRoute,
	'/privacy': PrivacyRoute,
	'/settings': SettingsRoute,
	'*': NotFoundRoute
};

const _compiledRoutes = map( routes, ( Route, path ) => {
	const keys = [];

	return [
		pathToRegexp( path, keys ),
		keys,
		Route
	];
} );

export function getRouteMatch( path ) {
	const [ pathname, search = '' ] = path.split( '?' );

	for ( let r = 0, rl = _compiledRoutes.length; r < rl; r++ ) {
		const [ regexp, keys, Route ] = _compiledRoutes[ r ];
		const match = pathname.match( regexp );
		if ( ! match ) {
			continue;
		}

		const params = {};
		for ( let m = 1, ml = match.length; m < ml; m++ ) {
			params[ keys[ m - 1 ].name ] = decodeURIComponent( match[ m ] );
		}

		return {
			params,
			Route,
			query: parseQuerystring( search )
		};
	}
}
