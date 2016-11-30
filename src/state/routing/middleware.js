/**
 * External dependencies
 */

import { includes } from 'lodash';

/**
 * Internal dependencies
 */

import { ROUTE_PATH_PUSH, ROUTE_PATH_REPLACE } from 'state/action-types';
import { replaceRoutePath } from './actions';
import { getRoutePath } from './selectors';

/**
 * Action types which affect route location.
 *
 * @type {Array}
 */
const ROUTE_CHANGE_TYPES = [ ROUTE_PATH_PUSH, ROUTE_PATH_REPLACE ];

/**
 * Redux middleware used in synchronizing Redux routing state with History API.
 *
 * @param  {Function} store.dispatch Store instance dispatch
 * @param  {Function} store.getState Store instance state getter
 * @return {Function}                Redux middleware
 */
export default ( { dispatch, getState } ) => {
	window.addEventListener( 'popstate', function( event ) {
		if ( event.state && event.state.path ) {
			dispatch( replaceRoutePath( event.state.path ) );
		}
	} );

	return ( next ) => ( action ) => {
		const { type, path } = action;
		if ( ROUTE_PATH_PUSH === type && path !== getRoutePath( getState() ) ) {
			history.pushState( { path }, null, path );
		}

		if ( includes( ROUTE_CHANGE_TYPES, action.type ) ) {
			window.scrollTo( 0, 0 );
		}

		return next( action );
	};
};
