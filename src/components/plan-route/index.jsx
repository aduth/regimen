/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { addPlanToProfile } from 'state/profile/actions';
import { setPlanId } from 'state/ui/actions';
import { getPlanId } from 'state/ui/selectors';
import { getPlan } from 'state/plans/selectors';
import PlanPageHeader from 'components/plan-page-header';
import QueryPlan from 'components/query-plan';
import Page from 'components/page';

class PlanRoute extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired,
		plan: PropTypes.object,
		notFoundPlan: PropTypes.bool,
		requestingPlan: PropTypes.bool,
		requestPlan: PropTypes.func,
		setPlanWorkout: PropTypes.func
	};

	static defaultProps = {
		notFoundPlan: false,
		requestingPlan: false,
		setPlanWorkout: () => {},
		setPlanId: () => {}
	};

	componentDidMount() {
		this.setPlanState();
	}

	componentDidUpdate() {
		this.setPlanState();
	}

	setPlanState() {
		const { setPlanId, params, addPlanToProfile, plan } = this.props;

		setPlanId( params.planId );

		if ( plan ) {
			addPlanToProfile( params.planId );
		}
	}

	render() {
		const { params, children } = this.props;

		return (
			<Page title="Plan" header={ <PlanPageHeader /> }>
				<QueryPlan planId={ params.planId } />
				{ children }
			</Page>
		);
	}
}

export default connect( ( state ) => {
	return {
		plan: getPlan( state, getPlanId( state ) )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		addPlanToProfile,
		setPlanId
	}, dispatch );
} )( PlanRoute );
