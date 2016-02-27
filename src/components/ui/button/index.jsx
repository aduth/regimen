/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

function Button( { success, danger, type, large, to, onClick, disabled, className, children } ) {
	const classes = classNames( 'button', className, {
		'is-success': success,
		'is-danger': danger,
		'is-large': large
	} );

	let props = { className: classes, disabled },
		element;

	if ( to ) {
		element = Link;
		props = { ...props, to };
	} else {
		element = 'button';
		props = { ...props, type, onClick };
	}

	return React.createElement( element, props, children );
}

Button.propTypes = {
	success: PropTypes.bool,
	danger: PropTypes.bool,
	type: PropTypes.oneOf( [ 'button', 'submit', 'reset' ] ),
	large: PropTypes.bool,
	to: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node
};

Button.defaultProps = {
	type: 'button'
};

export default Button;
