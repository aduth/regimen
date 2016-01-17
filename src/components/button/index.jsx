/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

function Button( { success, danger, to, onClick, children } ) {
	const classes = classNames( 'button', {
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
			type: 'button',
			className: classes,
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
	children: PropTypes.node
};

export default Button;
