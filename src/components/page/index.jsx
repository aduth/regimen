/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

/**
 * Internal dependencies
 */

import Header from 'components/header';

function Page( { title, children } ) {
	return (
		<div>
			<Helmet title={ [ title, 'Regimen' ].filter( Boolean ).join( ' | ' ) } />
			<Header title={ title } />
			{ children }
		</div>
	);
}

Page.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node
};

export default Page;
