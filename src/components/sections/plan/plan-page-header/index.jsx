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
import { getPlan, isRequestingPlan } from 'state/plans/selectors';

function PlanPageHeader( { title, loading } ) {
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

	return {
		title: get( getPlan( state, planId ), 'title', '' ),
		loading: isRequestingPlan( state, planId )
	};
} )( PlanPageHeader );
