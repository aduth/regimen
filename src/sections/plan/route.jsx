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
import { getPlan, isPlanNotFound } from 'state/plans/selectors';
import NotFoundRoute from 'sections/not-found/route';
import QueryPlan from 'components/query-plan';
import Page from 'layout/page';
import PlanPageHeader from './plan-page-header';

class PlanRoute extends Component {
	static propTypes = {
		planId: PropTypes.string,
		params: PropTypes.object.isRequired,
		plan: PropTypes.object,
		notFound: PropTypes.bool,
		setPlanId: PropTypes.func,
		addPlanToProfile: PropTypes.func,
		children: PropTypes.node
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
		if ( nextProps.params.planId !== this.props.params.planId ) {
			nextProps.setPlanId( nextProps.params.planId );
		}

		if ( nextProps.plan && ( ! this.props.plan ||
				nextProps.params.planId !== this.props.params.planId ) ) {
			nextProps.addPlanToProfile( nextProps.params.planId );
		}
	}

	componentWillUnmount() {
		this.props.setPlanId( null );
	}

	render() {
		const { params, children, notFound } = this.props;

		if ( notFound ) {
			return <NotFoundRoute />;
		}

		return (
			<Page title="Plan" header={ <PlanPageHeader /> }>
				<QueryPlan planId={ params.planId } />
				{ children }
			</Page>
		);
	}
}

export default connect( ( state ) => {
	const planId = getPlanId( state );

	return {
		plan: getPlan( state, planId ),
		notFound: isPlanNotFound( state, planId )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		addPlanToProfile,
		setPlanId
	}, dispatch );
} )( PlanRoute );
