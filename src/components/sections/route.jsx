/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

import QueryProfile from 'components/data/query-profile';

function BaseRoute( { children } ) {
	// Scroll to top of page for each route change
	window.scrollTo( 0, 0 );

	return (
		<div>
			<QueryProfile />
			{ children }
		</div>
	);
}

BaseRoute.propTypes = {
	children: PropTypes.node
};

export default BaseRoute;
