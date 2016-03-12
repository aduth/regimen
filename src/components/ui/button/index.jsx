/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

function Button( props ) {
	const {
		plain, success, danger, type, large, to,
		onClick, disabled, className, children
	} = props;

	const classes = classNames( 'button', className, {
		'is-plain': plain,
		'is-success': success,
		'is-danger': danger,
		'is-large': large
	} );

	const baseProps = { className: classes, disabled, children };

	if ( to ) {
		return <Link { ...baseProps } to={ to } />;
	}

	return (
		<button
			{ ...baseProps }
			type={ type }
			onClick={ onClick } />
	);
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
