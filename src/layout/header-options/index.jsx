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

import { getMatchedRoute } from 'state/routing/selectors';
import { toggleHeaderOptionsActive } from 'state/ui/actions';
import { isHeaderOptionsActive } from 'state/ui/selectors';
import PopoverMenu from 'components/popover-menu';
import PopoverMenuItem from 'components/popover-menu/item';

function HeaderOptions( { planId, active, toggleActive, className } ) {
	const classes = classNames( 'header-options', className );

	return (
		<div className={ classes }>
			<PopoverMenu visible={ active } onClose={ toggleActive }>
				{ planId && (
					<PopoverMenuItem to={ `/plan/new?planId=${ planId }` }>
						Edit
					</PopoverMenuItem>
				) }
				<PopoverMenuItem to="/settings">
					Settings
				</PopoverMenuItem>
			</PopoverMenu>
		</div>
	);
}

HeaderOptions.propTypes = {
	planId: PropTypes.string,
	active: PropTypes.bool,
	toggleActive: PropTypes.func,
	className: PropTypes.string
};

HeaderOptions.defaultProps = {
	active: false,
	toggleActive: () => {}
};

export default connect( ( state ) => {
	const route = getMatchedRoute( state );
	const { planId } = route.params;

	return {
		planId,
		active: isHeaderOptionsActive( state )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		toggleActive: toggleHeaderOptionsActive
	}, dispatch );
} )( HeaderOptions );
