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

import QueryPlan from 'components/query-plan';
import { isRequestingPlan } from 'state/plans/selectors';
import { getPlan } from 'state/plans/selectors';

function PlanName( { name, planId, requestingPlan } ) {
	const classes = classNames( 'plan-name', {
		'is-loading': requestingPlan
	} );

	return (
		<span className={ classes }>
			<QueryPlan planId={ planId } />
			{ name }
		</span>
	);
}

PlanName.propTypes = {
	name: PropTypes.string,
	planId: PropTypes.string,
	requestingPlan: PropTypes.bool
};

export default connect( ( state, ownProps ) => {
	return {
		name: get( getPlan( state, ownProps.planId ), 'title', '' ),
		requestingPlan: isRequestingPlan( state, ownProps.planId )
	}
} )( PlanName );
