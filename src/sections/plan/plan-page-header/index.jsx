/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';

/**
 * Internal dependencies
 */

import { getPlanId } from 'state/ui/selectors';
import { getPlan } from 'state/plans/selectors';

function PlanPageHeader( { loading, title } ) {
	const classes = classNames( 'plan-page-header', {
		'is-loading': loading
	} );

	return (
		<span className={ classes }>
			{ loading ? 'Loading' : title }
		</span>
	);
}

PlanPageHeader.propTypes = {
	title: PropTypes.string,
	loading: PropTypes.bool
};

export default connect( ( state ) => {
	const planId = getPlanId( state );
	const plan = getPlan( state, planId );

	return {
		loading: ! plan,
		title: get( plan, 'title', '' )
	};
} )( PlanPageHeader );
