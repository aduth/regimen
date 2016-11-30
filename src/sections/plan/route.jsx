/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { addPlanToProfile } from 'state/profile/actions';
import { getMatchedRoute } from 'state/routing/selectors';
import { getPlan, isPlanNotFound } from 'state/plans/selectors';
import NotFoundRoute from 'sections/not-found/route';
import QueryPlan from 'components/query-plan';
import Page from 'layout/page';
import PlanPageHeader from './plan-page-header';

class PlanRoute extends Component {
	static propTypes = {
		planId: PropTypes.string,
		plan: PropTypes.object,
		notFound: PropTypes.bool,
		addPlanToProfile: PropTypes.func
	};

	static defaultProps = {
		addPlanToProfile: () => {}
	};

	componentWillMount() {
		if ( this.props.plan ) {
			this.props.addPlanToProfile( this.props.planId );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.plan && ( ! this.props.plan ||
				nextProps.planId !== this.props.planId ) ) {
			nextProps.addPlanToProfile( nextProps.planId );
		}
	}

	render() {
		const { planId, notFound } = this.props;

		if ( notFound ) {
			return <NotFoundRoute />;
		}

		return (
			<Page title="Plan" header={ <PlanPageHeader /> }>
				<QueryPlan planId={ planId } />
			</Page>
		);
	}
}

export default connect(
	( state ) => {
		const route = getMatchedRoute( state );
		const { planId } = route.params;

		return {
			planId,
			plan: getPlan( state, planId ),
			notFound: isPlanNotFound( state, planId )
		};
	},
	{ addPlanToProfile }
)( PlanRoute );
