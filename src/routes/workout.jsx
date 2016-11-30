/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getMatchedRoute } from 'state/routing/selectors';
import { setWorkoutRoute } from 'state/routing/actions';
import { isPlanNotFound } from 'state/plans/selectors';
import QueryPlan from 'components/query-plan';
import PlanPageHeader from 'components/plan-page-header';
import Page from 'components/page';
import Content from 'components/content';
import Workout from 'components/workout';
import Accessory from 'components/accessory';
import WorkoutPagination from 'components/workout-pagination';
import NotFoundRoute from './not-found';

class WorkoutRoute extends Component {
	static propTypes = {
		planId: PropTypes.string.isRequired,
		workout: PropTypes.number,
		notFound: PropTypes.bool,
		setWorkoutRoute: PropTypes.func
	};

	static defaultProps = {
		setWorkoutRoute: () => {}
	};

	componentWillMount() {
		this.setWorkoutState( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		this.setWorkoutState( nextProps );
	}

	setWorkoutState( props ) {
		const { planId, workout } = props;
		if ( ! ( workout > 0 ) ) {
			props.setWorkoutRoute( planId, 1 );
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
				<WorkoutPagination />
				<Content>
					<Workout />
					<Accessory />
				</Content>
			</Page>
		);
	}
}

export default connect(
	( state ) => {
		const route = getMatchedRoute( state );
		const { workout, planId } = route.params;

		return {
			planId,
			workout: parseInt( workout, 10 ),
			notFound: isPlanNotFound( state, planId )
		};
	},
	{ setWorkoutRoute }
)( WorkoutRoute );
