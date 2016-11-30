/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getMatchedRoute } from 'state/routing/selectors';
import { getPlan } from 'state/plans/selectors';
import Page from 'components/page';
import Content from 'components/content';
import RoutineForm from './routine-form';
import NewPlanSelection from './new-plan-selection';
import QueryPlan from 'components/query-plan';
import * as routines from 'routines';

function NewPlanRoute( { planId, routine, plan } ) {
	const isFormVisible = !! ( routine || planId );
	routine = plan ? plan.routine : routine;

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
	planId: PropTypes.string,
	routine: PropTypes.oneOf( Object.keys( routines ) ),
	plan: PropTypes.object
};

export default connect( ( state ) => {
	const route = getMatchedRoute( state );
	const { planId, routine } = route.query;

	return {
		planId,
		routine,
		plan: getPlan( state, planId )
	};
} )( NewPlanRoute );
