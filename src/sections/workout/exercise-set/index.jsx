/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

import Weight from 'components/weight';

function ExerciseSet( { weight, reps } ) {
	return (
		<div className="exercise-set">
			<div className="exercise-set__weight-label">
				<Weight
					weight={ weight }
					className="exercise-set__weight" />
			</div>
			<div className="exercise-set__reps-label">
				<span className="exercise-set__reps">
					{ reps }
				</span>
				reps
			</div>
		</div>
	);
}

ExerciseSet.propTypes = {
	weight: PropTypes.number,
	reps: PropTypes.number
};

ExerciseSet.defaultProps = {
	weight: 0,
	reps: 0
};

export default ExerciseSet;
