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

import QueryPlan from 'components/query-plan';
import { getPlan } from 'state/plans/selectors';

function PlanName( { name, planId, loading } ) {
	const classes = classNames( 'plan-name', {
		'is-loading': loading
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
	loading: PropTypes.bool
};

export default connect( ( state, ownProps ) => {
	const plan = getPlan( state, ownProps.planId );
	return {
		name: get( plan, 'title', '' ),
		loading: ! plan
	}
} )( PlanName );
