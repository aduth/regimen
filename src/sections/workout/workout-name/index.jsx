/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getMatchedRoute } from 'state/routing/selectors';
import { getPlanRoutine } from 'state/plans/selectors';
import Weekday from 'components/weekday';
import SessionLabel from 'sections/workout/session-label';

function WorkoutName( { routine, workout } ) {
	let weekdays, sessions;
	if ( routine ) {
		sessions = routine.sessions;

		if ( routine.weekdays ) {
			weekdays = routine.weekdays.length;
		}
	}

	return (
		<div className="workout-name">
			<div className="workout-name__title">
				{ weekdays && (
					`Week ${ Math.ceil( workout / weekdays ) }`
				) }
				{ sessions && (
					<SessionLabel
						sessions={ sessions }
						workout={ workout } />
				) }
			</div>
			<div className="workout-name__subtitle">
				{ weekdays && (
					<Weekday weekday={ routine.weekdays[ ( workout - 1 ) % weekdays ] } />
				) }
				{ sessions && (
					`Session ${ workout }`
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
	const route = getMatchedRoute( state );
	const { planId, workout } = route.params;

	return {
		routine: getPlanRoutine( state, planId ),
		workout: parseInt( workout, 10 )
	};
} )( WorkoutName );
