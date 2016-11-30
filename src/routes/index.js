/**
 * External dependencies
 */

import { parse as parseQuerystring } from 'querystring';
import pathToRegexp from 'path-to-regexp';
import { map } from 'lodash';

/**
 * Internal dependencies
 */

import HomeRoute from './home';
import NewPlanRoute from './new-plan';
import WorkoutRoute from './workout';
import AboutRoute from './about';
import PrivacyRoute from './privacy';
import SettingsRoute from './settings';
import NotFoundRoute from './not-found';

export const routes = {
	'/': HomeRoute,
	'/plan(/new)?': NewPlanRoute,
	'/plan/:planId': WorkoutRoute,
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
