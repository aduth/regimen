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
import { setProfilePlanProgress } from 'state/profile/actions';
import QueryPlan from 'components/query-plan';
import PlanPageHeader from 'sections/plan/plan-page-header';
import Page from 'layout/page';
import Content from 'layout/content';
import Workout from './workout';
import Accessory from './accessory';
import WorkoutPagination from './workout-pagination';

class WorkoutRoute extends Component {
	static propTypes = {
		planId: PropTypes.string.isRequired,
		workout: PropTypes.string,
		setProfilePlanProgress: PropTypes.func,
		setWorkoutRoute: PropTypes.func
	};

	static defaultProps = {
		setProfilePlanProgress: () => {},
		setWorkoutRoute: () => {}
	};

	componentWillMount() {
		this.setWorkoutState( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		this.setWorkoutState( nextProps );
	}

	setWorkoutState( props ) {
		const { planId, setProfilePlanProgress, setWorkoutRoute } = props;
		const workout = parseInt( props.workout, 10 );

		if ( workout > 0 ) {
			setProfilePlanProgress( planId, workout );
		} else {
			setWorkoutRoute( planId, 1 );
		}
	}

	render() {
		return (
			<Page title="Plan" header={ <PlanPageHeader /> }>
				<QueryPlan planId={ this.props.planId } />
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
		return { workout, planId };
	},
	{
		setProfilePlanProgress,
		setWorkoutRoute
	}
)( WorkoutRoute );
