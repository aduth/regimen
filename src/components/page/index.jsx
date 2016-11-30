/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

/**
 * Internal dependencies
 */

import Header from 'components/header';
import Notices from 'components/notices';
import Footer from 'components/footer';

function Page( { title, header, children } ) {
	return (
		<div>
			<Helmet title={ [ title, 'Regimen' ].filter( Boolean ).join( ' | ' ) } />
			<Header title={ header || title } />
			<Notices />
			{ children }
			<Footer />
		</div>
	);
}

Page.propTypes = {
	title: PropTypes.string,
	header: PropTypes.node,
	children: PropTypes.node
};

export default Page;
