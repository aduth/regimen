/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

function PopoverMenuItem( { onClick, children } ) {
	return (
		<li className="popover-menu-item">
			<button
				type="button"
				onClick={ onClick }
				className="popover-menu-item__button">
				{ children }
			</button>
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