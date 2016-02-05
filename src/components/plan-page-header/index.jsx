/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/object/get';

/**
 * Internal dependencies
 */

import { getPlanId } from 'state/ui/selectors';
import { getPlan, isRequestingPlan, isPlanNotFound } from 'state/plans/selectors';

function PlanPageHeader( { title, requestingPlan, planNotFound } ) {
	const classes = classNames( 'plan-page-header', {
		'is-loading': requestingPlan
	} );

	if ( requestingPlan ) {
		title = 'Loading';
	} else if ( planNotFound ) {
		title = 'Not Found';
	}

	return (
		<span className={ classes }>
			{ title }
		</span>
	);
}

PlanPageHeader.propTypes = {
	title: PropTypes.string,
	requestingPlan: PropTypes.bool,
	planNotFound: PropTypes.bool
}

export default connect( ( state ) => {
	const planId = getPlanId( state );
	return {
		title: get( getPlan( state, planId ), 'title', '' ),
		requestingPlan: isRequestingPlan( state, planId ),
		planNotFound: isPlanNotFound( state, planId )
	};
} )( PlanPageHeader );
