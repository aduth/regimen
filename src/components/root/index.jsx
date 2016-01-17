/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

/**
 * Internal dependencies
 */

import routes from 'routes';

function Root( { store, children } ) {
	return (
		<Provider store={ store }>
			{ children }
		</Provider>
	);
}

Root.propTypes = {
	store: PropTypes.object,
	children: PropTypes.node
};

export default Root;
