/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

export default function SessionLabel( { sessions, workout } ) {
	const charCode = 65 + Math.min( ( workout - 1 ) % sessions, 25 );
	const letter = String.fromCharCode( charCode );

	return (
		<span className="session-label">
			Workout { letter }
		</span>
	);
}

SessionLabel.propTypes = {
	sessions: PropTypes.number,
	workout: PropTypes.number
};
