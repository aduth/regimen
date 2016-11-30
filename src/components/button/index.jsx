/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import Link from 'components/link';

function Button( props ) {
	const {
		plain, success, danger, type, large, to, href,
		onClick, disabled, target, className, children
	} = props;

	const classes = classNames( 'button', className, {
		'is-plain': plain,
		'is-success': success,
		'is-danger': danger,
		'is-large': large
	} );

	const baseProps = { className: classes, disabled, children };

	if ( to ) {
		return <Link { ...baseProps } to={ to } target={ target } />;
	} else if ( href ) {
		return <a { ...baseProps } href={ href } target={ target } />;
	}

	return (
		<button
			{ ...baseProps }
			type={ type }
			onClick={ onClick } />
	);
}

Button.propTypes = {
	plain: PropTypes.bool,
	success: PropTypes.bool,
	danger: PropTypes.bool,
	type: PropTypes.oneOf( [ 'button', 'submit', 'reset' ] ),
	large: PropTypes.bool,
	to: PropTypes.string,
	href: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	target: PropTypes.oneOf( [ '_self', '_blank', '_parent', '_top' ] ),
	className: PropTypes.string,
	children: PropTypes.node
};

Button.defaultProps = {
	type: 'button'
};

export default Button;
