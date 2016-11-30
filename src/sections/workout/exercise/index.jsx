/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getMatchedRoute } from 'state/routing/selectors';
import { getPlan, getPlanRoutine } from 'state/plans/selectors';
import { Exercises } from 'routines/constants';
import Block from 'components/block';
import ExerciseName from 'components/exercise-name';
import ExerciseSet from 'sections/workout/exercise-set';

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
							minReps={ set.minReps }
							reps={ set.reps }
							weight={ set.weight }
							optional={ set.optional } />
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
	const route = getMatchedRoute( state );
	const { planId, workout } = route.params;

	return {
		plan: getPlan( state, planId ),
		routine: getPlanRoutine( state, planId ),
		workout: parseInt( workout, 10 )
	};
} )( Exercise );
