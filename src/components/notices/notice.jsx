/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { partial } from 'lodash';

/**
 * Internal dependencies
 */

import { dismissNotice } from 'state/notices/actions';
import { getNotice } from 'state/notices/selectors';

function NoticesNotice( { notice, dismiss } ) {
	if ( ! notice ) {
		return null;
	}

	const classes = classNames( 'notices__notice', {
		'is-success': notice.success,
		'is-error': notice.error,
		'is-info': notice.info
	} );

	return (
		<div onClick={ dismiss } className={ classes }>
			{ notice.text }
		</div>
	);
}

NoticesNotice.propTypes = {
	notice: PropTypes.object,
	dismiss: PropTypes.func
};

export default connect(
	( state, { id } ) => ( {
		notice: getNotice( state, id )
	} ),
	( dispatch, { id } ) => ( {
		dismiss: partial( dispatch, dismissNotice( id ) )
	} )
)( NoticesNotice );
