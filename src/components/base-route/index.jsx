/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

import QueryProfile from 'components/query-profile';

function BaseRoute( { children } ) {
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
