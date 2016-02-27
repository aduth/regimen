/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */

import { toggleHeaderOptionsActive } from 'state/ui/actions';
import Icon from 'components/ui/icon';
import HeaderOptions from 'components/layout/header-options';

function Header( { title, toggleHeaderOptions } ) {
	return (
		<header className="header">
			<div className="header__content">
				<Link to="/" className="header__home">
					<Icon icon="home" />
				</Link>
				<span className="header__brand">
					{ title }
				</span>
				<button
					type="button"
					onClick={ toggleHeaderOptions }
					className="header__options">
					<span className="screen-reader-text">
						Options
					</span>
					<Icon icon="gear" />
				</button>
				<HeaderOptions
					className="header__options-menu" />
			</div>
		</header>
	);
}

Header.propTypes = {
	title: PropTypes.node
};

export default connect( null, ( dispatch ) => {
	return bindActionCreators( {
		toggleHeaderOptions: toggleHeaderOptionsActive
	}, dispatch );
} )( Header );