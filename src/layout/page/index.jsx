/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

/**
 * Internal dependencies
 */

import Header from 'layout/header';
import Notices from 'layout/notices';

function Page( { title, header, children } ) {
	return (
		<div>
			<Helmet title={ [ title, 'Regimen' ].filter( Boolean ).join( ' | ' ) } />
			<Header title={ header || title } />
			<Notices />
			{ children }
		</div>
	);
}

Page.propTypes = {
	title: PropTypes.string,
	header: PropTypes.node,
	children: PropTypes.node
};

export default Page;
