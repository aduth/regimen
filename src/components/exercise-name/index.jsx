/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { values, capitalize } from 'lodash';

/**
 * Internal dependencies
 */

import { Exercises } from 'routines/constants';

/**
 * Utility
 */

function constantToLabel( constant ) {
	return constant.split( '_' ).map( capitalize ).join( ' ' );
}

function ExerciseName( { exercise } ) {
	let name;
	switch ( exercise ) {
		case Exercises.CURL:
			name = 'Barbell Curl';
			break;

		case Exercises.DUMBBELL_LAT_RAISE:
			name = 'Dumbbell Lateral Raise';
			break;

		default:
			name = constantToLabel( exercise );
	}

	return (
		<div className="exercise-name">
			{ name }
		</div>
	);
}

ExerciseName.propTypes = {
	exercise: PropTypes.oneOf( values( Exercises ) )
};

export default ExerciseName;
