/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { map } from 'lodash';

/**
 * Internal dependencies
 */

import { getNotices } from 'state/notices/selectors';
import NoticesNotice from './notice';

function Notices( { notices } ) {
	return (
		<ul className="notices">
			<ReactCSSTransitionGroup
				transitionName="notices__items"
				transitionEnterTimeout={ 120 }
				transitionLeaveTimeout={ 120 }>
				{ map( notices, ( notice, id ) => (
					<NoticesNotice key={ id } id={ id } />
				) ) }
			</ReactCSSTransitionGroup>
		</ul>
	);
}

Notices.propTypes = {
	notices: PropTypes.object
};

export default connect(
	( state ) => ( {
		notices: getNotices( state )
	} )
)( Notices );
