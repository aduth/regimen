/**
 * External dependencies
 */

import { PropTypes } from 'react';

function BaseRoute( { children } ) {
	return children;
}

BaseRoute.propTypes = {
	children: PropTypes.node
};

export default BaseRoute;
