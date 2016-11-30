/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getMatchedRoute } from 'state/routing/selectors';
import QueryProfile from 'components/query-profile';

function Root( { Route } ) {
	return (
		<div>
			<QueryProfile />
			<Route />
		</div>
	);
}

Root.propTypes = {
	Route: PropTypes.oneOfType( [
		PropTypes.func,
		PropTypes.instanceOf( Component )
	] )
};

export default connect( ( state ) => ( {
	Route: getMatchedRoute( state ).Route
} ) )( Root );
