/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getPlanId, getWorkout } from 'state/ui/selectors';
import { getPlanRoutine } from 'state/plans/selectors';
import Exercise from 'components/exercise';

function Workout( { routine, workout } ) {
	return (
		<ul className="workout">
			{ routine && routine.exercises( workout ).map( ( exercise, i ) => {
				return (
					<li key={ i }>
						<Exercise exercise={ exercise } />
					</li>
				);
			} ) }
		</ul>
	);
}

Workout.propTypes = {
	routine: PropTypes.object,
	workout: PropTypes.number
};

Workout.defaultProps = {
	workout: 1
};

export default connect( ( state ) => {
	return {
		routine: getPlanRoutine( state, getPlanId( state ) ),
		workout: getWorkout( state )
	};
} )( Workout );
