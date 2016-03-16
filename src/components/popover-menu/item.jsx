/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

import Button from 'components/button';

function PopoverMenuItem( props ) {
	return (
		<li className="popover-menu__item">
			<Button plain { ...props } className="popover-menu__item-button" />
		</li>
	);
}

PopoverMenuItem.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node
};

PopoverMenuItem.defaultProps = {
	onClick: () => {}
};

export default PopoverMenuItem;
