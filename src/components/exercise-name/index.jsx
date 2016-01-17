/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

import { Exercises } from 'routines/constants';

export default function ExerciseName( { exercise } ) {
	let name;
	switch ( exercise ) {
		case Exercises.SQUAT:
			name = 'Squat';
			break;

		case Exercises.BENCH_PRESS:
			name = 'Bench Press';
			break;

		case Exercises.ROW:
			name = 'Row';
			break;

		case Exercises.OVERHEAD_PRESS:
			name = 'Overhead Press';
			break;

		case Exercises.DEADLIFT:
			name = 'Deadlift';
			break;
	}

	return (
		<div className="exercise-name">
			{ name }
		</div>
	);
}
