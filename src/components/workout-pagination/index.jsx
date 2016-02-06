/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { setWorkoutRoute } from 'state/routing/actions';
import { getPlan } from 'state/plans/selectors';
import { getPlanId, getWorkout } from 'state/ui/selectors';
import Icon from 'components/icon';
import WorkoutName from 'components/workout-name';

function WorkoutPagination( { planId, plan, workout, setWorkoutRoute } ) {
	const classes = classNames( 'workout-pagination', {
		'is-loading': ! plan
	} );

	return (
		<nav className={ classes }>
			<button
				disabled={ 1 === workout }
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
	plan: PropTypes.object,
	workout: PropTypes.number,
	setWorkoutRoute: PropTypes.func
};

WorkoutPagination.defaultProps = {
	workout: 1,
	setWorkoutRoute: () => {}
};

export default connect( ( state ) => {
	const planId = getPlanId( state );
	return {
		plan: getPlan( state, planId ),
		workout: getWorkout( state ),
		planId
	};
}, ( dispatch ) => {
	return bindActionCreators( { setWorkoutRoute }, dispatch );
} )( WorkoutPagination );
