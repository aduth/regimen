/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getPlan } from 'state/plans/selectors';
import Page from 'components/layout/page';
import Content from 'components/layout/content';
import RoutineForm from './routine-form';
import NewPlanSelection from './new-plan-selection';
import QueryPlan from 'components/data/query-plan';

function NewPlanRoute( { location, plan } ) {
	const planId = location.query.planId;
	const isFormVisible = location.query.routine || planId;
	const routine = plan ? plan.routine : location.query.routine;

	return (
		<Page title="Create Plan">
			{ planId && (
				<QueryPlan planId={ planId } />
			) }
			<Content>
				{ isFormVisible && (
					<RoutineForm routine={ routine } planId={ planId } />
				) }
				{ ! isFormVisible && (
					<NewPlanSelection />
				) }
			</Content>
		</Page>
	);
}

NewPlanRoute.propTypes = {
	location: PropTypes.object,
	plan: PropTypes.object
};

export default connect( ( state, ownProps ) => {
	if ( ! ownProps.location.query.planId ) {
		return {};
	}

	return {
		plan: getPlan( state, ownProps.location.query.planId )
	};
} )( NewPlanRoute );
