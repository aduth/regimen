/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { setDocumentHeadTitle } from 'state/document-head/actions';
import Header from 'components/header';
import Notices from 'components/notices';
import Footer from 'components/footer';

class Page extends Component {
	static propTypes = {
		title: PropTypes.string,
		setTitle: PropTypes.func,
		header: PropTypes.node,
		children: PropTypes.node
	};

	componentWillMount() {
		this.props.setTitle( this.props.title );
	}

	comonentWillReceiveProps( nextProps ) {
		if ( nextProps.title !== this.props.title ) {
			nextProps.setTitle( nextProps.title );
		}
	}

	render() {
		const { title, header, children } = this.props;

		return (
			<div>
				<Header title={ header || title } />
				<Notices />
				{ children }
				<Footer />
			</div>
		);
	}
}

export default connect( null, {
	setTitle: setDocumentHeadTitle
} )( Page );
