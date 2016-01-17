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
import { getPlan, isRequestingPlan, isPlanNotFound } from 'state/plans/selectors';
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
		const { params, plan, planNotFound, requestingPlan, children } = this.props;

		let title;
		if ( plan ) {
			title = plan.title;
		} else if ( planNotFound ) {
			title = 'Not Found';
		} else if ( requestingPlan ) {
			title = 'Loading';
		}

		return (
			<Page title={ title }>
				<QueryPlan planId={ params.planId } />
				{ children }
			</Page>
		);
	}
}

export default connect( ( state, ownProps ) => {
	return {
		plan: getPlan( state, ownProps.params.planId ),
		notFoundPlan: isPlanNotFound( state, ownProps.params.planId ),
		requestingPlan: isRequestingPlan( state, ownProps.params.planId )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		addPlanToProfile,
		setPlanId
	}, dispatch );
} )( PlanRoute );
