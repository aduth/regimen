/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */

import { toggleHeaderOptionsActive } from 'state/ui/actions';
import { isHeaderOptionsActive } from 'state/ui/selectors';
import PopoverMenu from 'components/popover-menu';
import PopoverMenuItem from 'components/popover-menu-item';

function HeaderOptions( { active, toggleActive, className } ) {
	const classes = classNames( 'header-options', className );

	return (
		<div className={ classes }>
			<PopoverMenu
				position="bottom left"
				visible={ active }
				onClose={ toggleActive }>
				<PopoverMenuItem>Edit</PopoverMenuItem>
				<PopoverMenuItem>Add to Mine</PopoverMenuItem>
			</PopoverMenu>
		</div>
	);
}

HeaderOptions.propTypes = {
	active: PropTypes.bool,
	className: PropTypes.string
};

HeaderOptions.defaultProps = {
	active: false
};

export default connect( ( state ) => {
	return {
		active: isHeaderOptionsActive( state )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		toggleActive: toggleHeaderOptionsActive
	}, dispatch );
} )( HeaderOptions );
