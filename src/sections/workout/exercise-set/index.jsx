/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import Weight from 'components/weight';

function ExerciseSet( { weight, minReps, reps, optional } ) {
	const classes = classNames( 'exercise-set', {
		'is-optional': optional
	} );

	let repsLabel;
	if ( minReps ) {
		repsLabel = [ minReps, reps ].join( '-' );
	} else {
		repsLabel = reps;
	}

	return (
		<div className={ classes }>
			{ !! weight && (
				<div className="exercise-set__weight-label">
					<Weight
						weight={ weight }
						className="exercise-set__weight" />
				</div>
			) }
			<div className="exercise-set__reps-label">
				<span className="exercise-set__reps">
					{ repsLabel }
				</span>
				reps
			</div>
			{ optional && ! weight && (
				<span className="exercise-set__optional">
					Optional
				</span>
			) }
		</div>
	);
}

ExerciseSet.propTypes = {
	weight: PropTypes.number,
	minReps: PropTypes.number,
	reps: PropTypes.number,
	optional: PropTypes.bool
};

ExerciseSet.defaultProps = {
	weight: 0,
	reps: 0
};

export default ExerciseSet;
