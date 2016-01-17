/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { setWorkoutRoute } from 'state/routing/actions';
import { getPlanId, getWorkout } from 'state/ui/selectors';
import Icon from 'components/icon';
import WorkoutName from 'components/workout-name';

function WorkoutPagination( { planId, workout, setWorkoutRoute } ) {
	return (
		<nav className="workout-pagination">
			<button
				onClick={ () => setWorkoutRoute( planId, workout - 1 ) }
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
				onClick={ () => setWorkoutRoute( planId, workout + 1 ) }
				className="workout-pagination__button is-next">
				<span className="workout-pagination__button-label">
					Next
				</span>
				<Icon icon="caret-right" />
			</button>
		</nav>
	);
}

WorkoutPagination.propTypes = {
	planId: PropTypes.string,
	workout: PropTypes.number,
	setWorkoutRoute: PropTypes.func
};

WorkoutPagination.defaultProps = {
	workout: 1,
	setWorkoutRoute: () => {}
};

export default connect( ( state ) => {
	return {
		planId: getPlanId( state ),
		workout: getWorkout( state )
	};
}, ( dispatch ) => {
	return bindActionCreators( { setWorkoutRoute }, dispatch );
} )( WorkoutPagination );
