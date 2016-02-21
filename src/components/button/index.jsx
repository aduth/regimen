/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

function Button( { success, danger, type, to, onClick, className, children } ) {
	const classes = classNames( 'button', className, {
		'is-success': success,
		'is-danger': danger
	} );

	let element, props;
	if ( to ) {
		element = Link;
		props = { className: classes, to };
	} else {
		element = 'button';
		props = {
			className: classes,
			type,
			onClick
		};
	}

	return React.createElement( element, props, children );
}

Button.propTypes = {
	success: PropTypes.bool,
	danger: PropTypes.bool,
	to: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
	children: PropTypes.node
};

Button.defaultProps = {
	type: 'button'
};

export default Button;
