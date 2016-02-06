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
		setPlanId: PropTypes.func,
		addPlanToProfile: PropTypes.func
	};

	static defaultProps = {
		setPlanId: () => {},
		addPlanToProfile: () => {}
	};

	componentWillMount() {
		this.props.setPlanId( this.props.params.planId );

		if ( this.props.plan ) {
			this.props.addPlanToProfile( this.props.params.planId );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.params.planId !== this.props.planId ) {
			nextProps.setPlanId( nextProps.params.planId );
		}

		if ( nextProps.plan ) {
			nextProps.addPlanToProfile( nextProps.params.planId );
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
