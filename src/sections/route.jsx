/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

import { GA_ACCOUNT_ID } from 'config';
import QueryProfile from 'components/query-profile';

function BaseRoute( { location, children } ) {
	// Scroll to top of page for each route change
	window.scrollTo( 0, 0 );

	// Analytics
	if ( GA_ACCOUNT_ID ) {
		window.ga( 'send', 'pageview', location.pathname );
	}

	return (
		<div>
			<QueryProfile />
			{ children }
		</div>
	);
}

BaseRoute.propTypes = {
	location: PropTypes.object,
	children: PropTypes.node
};

export default BaseRoute;
