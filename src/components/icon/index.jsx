/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Icon( { icon } ) {
	const classes = classNames( 'icon', 'fa', 'fa-' + icon );

	return <span className={ classes } />;
}

Icon.propTypes = {
	icon: PropTypes.string.isRequired
};

export default Icon;
