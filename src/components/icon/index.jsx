/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Icon( { icon, children } ) {
	const classes = classNames( 'icon', 'fa', 'fa-' + icon );

	return (
		<span className={ classes }>
			{ children && (
				<span className="icon__screen-reader-text">
					{ children }
				</span>
			) }
		</span>
	);
}

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	children: PropTypes.node
};

export default Icon;
