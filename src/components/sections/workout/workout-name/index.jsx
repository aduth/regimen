/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getPlanRoutine } from 'state/plans/selectors';
import { getPlanId, getWorkout } from 'state/ui/selectors';
import Weekday from 'components/ui/weekday';

function WorkoutName( { routine, workout } ) {
	let weekdays;
	if ( routine ) {
		weekdays = routine.weekdays.length;
	}

	return (
		<div className="workout-name">
			<div className="workout-name__title">
				{ routine && (
					`Week ${ Math.ceil( workout / weekdays ) }`
				) }
			</div>
			<div className="workout-name__subtitle">
				{ routine && (
					<Weekday weekday={ routine.weekdays[ ( workout - 1 ) % weekdays ] } />
				) }
			</div>
		</div>
	);
}

WorkoutName.propTypes = {
	routine: PropTypes.object,
	workout: PropTypes.number
};

export default connect( ( state ) => {
	return {
		routine: getPlanRoutine( state, getPlanId( state ) ),
		workout: getWorkout( state )
	};
} )( WorkoutName );
