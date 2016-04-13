/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import IconCaretLeft from 'react-icons/fa/caret-left';
import IconCaretRight from 'react-icons/fa/caret-right';
import IconPlus from 'react-icons/fa/plus';
import IconHome from 'react-icons/fa/home';
import IconCog from 'react-icons/fa/cog';
import IconPlay from 'react-icons/fa/play';
import IconTrash from 'react-icons/fa/trash';
import IconClose from 'react-icons/fa/close';

function Icon( { icon, children } ) {
	const classes = classNames( 'icon', 'is-' + icon );

	let IconVariant;
	switch ( icon ) {
		case 'caret-left': IconVariant = IconCaretLeft; break;
		case 'caret-right': IconVariant = IconCaretRight; break;
		case 'plus': IconVariant = IconPlus; break;
		case 'home': IconVariant = IconHome; break;
		case 'cog': IconVariant = IconCog; break;
		case 'play': IconVariant = IconPlay; break;
		case 'trash': IconVariant = IconTrash; break;
		case 'close': IconVariant = IconClose; break;
	}

	return (
		<span className={ classes }>
			<IconVariant className="icon__variant" />
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
