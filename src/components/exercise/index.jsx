/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getPlanId, getWorkout } from 'state/ui/selectors';
import { getPlan, getPlanRoutine } from 'state/plans/selectors';
import { Exercises } from 'routines/constants';
import Block from 'components/block';
import ExerciseName from 'components/exercise-name';
import ExerciseSet from 'components/exercise-set';

function Exercise( { exercise, plan, routine, workout } ) {
	return (
		<Block
			title={ <ExerciseName exercise={ exercise } /> }
			className="exercise">
			<ul className="exercise__list">
				{ routine.sets( plan, workout, exercise ).map( ( set, i ) => {
					return (
						<ExerciseSet
							key={ i }
							reps={ set.reps }
							weight={ set.weight } />
					);
				} ) }
			</ul>
		</Block>
	);
}

Exercise.propTypes = {
	exercise: PropTypes.oneOf( Object.keys( Exercises ) ),
	plan: PropTypes.object,
	routine: PropTypes.object,
	workout: PropTypes.number
};

Exercise.defaultProps = {
	workout: 1
};

export default connect( ( state ) => {
	const planId = getPlanId( state );

	return {
		plan: getPlan( state, planId ),
		routine: getPlanRoutine( state, planId ),
		workout: getWorkout( state )
	};
} )( Exercise );
