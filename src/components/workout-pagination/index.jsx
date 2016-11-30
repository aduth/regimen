/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { getMatchedRoute } from 'state/routing/selectors';
import { setWorkoutRoute } from 'state/routing/actions';
import { getPlan } from 'state/plans/selectors';
import Icon from 'components/icon';
import WorkoutName from 'components/workout-name';

class WorkoutPagination extends Component {
	static propTypes = {
		planId: PropTypes.string,
		plan: PropTypes.object,
		workout: PropTypes.number,
		setWorkoutRoute: PropTypes.func
	};

	static defaultProps = {
		workout: 1,
		setWorkoutRoute: () => {}
	};

	incrementWorkout = ( increment ) => {
		const { planId, workout } = this.props;
		this.props.setWorkoutRoute( planId, workout + increment );
	};

	toPreviousWorkout = () => this.incrementWorkout( -1 );

	toNextWorkout = () => this.incrementWorkout( 1 );

	render() {
		const { plan, workout } = this.props;
		const classes = classNames( 'workout-pagination', {
			'is-loading': ! plan
		} );

		return (
			<nav className={ classes }>
				<div className="workout-pagination__content">
					<button
						disabled={ 1 === workout }
						onClick={ this.toPreviousWorkout }
						className="workout-pagination__button is-previous">
						<span className="workout-pagination__button-label">
							Previous
						</span>
						<Icon icon="caret-left" />
					</button>
					<header className="workout-pagination__header">
						<WorkoutName />
					</header>
					<button
						onClick={ this.toNextWorkout }
						className="workout-pagination__button is-next">
						<span className="workout-pagination__button-label">
							Next
						</span>
						<Icon icon="caret-right" />
					</button>
				</div>
			</nav>
		);
	}
}

export default connect(
	( state ) => {
		const route = getMatchedRoute( state );
		const { planId, workout } = route.params;

		return {
			plan: getPlan( state, planId ),
			workout: parseInt( workout, 10 ),
			planId
		};
	},
	{ setWorkoutRoute }
)( WorkoutPagination );
