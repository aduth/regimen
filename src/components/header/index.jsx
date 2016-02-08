/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */

import { toggleHeaderOptionsActive } from 'state/ui/actions';
import Icon from 'components/icon';
import HeaderOptions from 'components/header-options';

function Header( { title, toggleHeaderOptions } ) {
	const classes = classNames( 'header', {
		'is-ios-standalone': (
			navigator.standalone &&
			/(iPad|iPhone|iPod)/.test( navigator.userAgent )
		)
	} );

	return (
		<header className={ classes }>
			<Link to="/" className="header__home">
				<Icon icon="home" />
			</Link>
			<span className="header__brand">
				{ title }
			</span>
			<span className="header__options">
				<button
					type="button"
					onClick={ toggleHeaderOptions }
					className="header__options-button">
					<span className="screen-reader-text">
						Options
					</span>
					<Icon icon="gear" />
				</button>
				<HeaderOptions
					className="header__options-menu" />
			</span>
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
