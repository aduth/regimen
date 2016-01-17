/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

function Content( { children } ) {
	return (
		<main className="content">
			{ children }
		</main>
	);
}

Content.propTypes = {
	children: PropTypes.node
};

export default Content;
