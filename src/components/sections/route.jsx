/**
 * External dependencies
 */

import { PropTypes } from 'react';

function BaseRoute( { children } ) {
	// Scroll to top of page for each route change
	window.scrollTo( 0, 0 );

	return children;
}

BaseRoute.propTypes = {
	children: PropTypes.node
};

export default BaseRoute;
