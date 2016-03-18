/**
 * Given a Google Analytics analytics.js instance, returns a Redux middleware
 * which tracks an Action event when a non-internal action is dispatched to the
 * Redux store.
 *
 * @param  {Object}   ga Google Analytics instance
 * @return {Function}    Redux middleware
 */
export function analytics( ga ) {
	const REGEXP_INTERNAL_TYPE = /^@@/;

	return () => ( next ) => ( action ) => {
		if ( ! REGEXP_INTERNAL_TYPE.test( action.type ) ) {
			ga( 'send', 'event', 'Action', action.type );
		}

		return next( action );
	};
}
