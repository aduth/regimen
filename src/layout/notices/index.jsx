/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { map } from 'lodash';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { getNotices } from 'state/notices/selectors';
import { dismissNotice } from 'state/notices/actions';

function Notices( { notices, dismissNotice } ) {
	return (
		<ul className="notices">
			<ReactCSSTransitionGroup
				transitionName="notices__items"
				transitionEnterTimeout={ 120 }
				transitionLeaveTimeout={ 120 }>
				{ map( notices, ( notice, id ) => {
					const itemClasses = classNames( 'notices__notice', {
						'is-success': notice.success,
						'is-error': notice.error,
						'is-info': notice.info
					} );

					return (
						<li
							key={ id }
							onClick={ () => dismissNotice( id ) }
							className={ itemClasses }>
							{ notice.text }
						</li>
					);
				} ) }
			</ReactCSSTransitionGroup>
		</ul>
	);
}

Notices.propTypes = {
	notices: PropTypes.object,
	dismissNotice: PropTypes.func.isRequired
};

export default connect(
	( state ) => ( {
		notices: getNotices( state )
	} ),
	{ dismissNotice }
)( Notices );
