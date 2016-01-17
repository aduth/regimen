/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

import { Weekdays } from 'routines/constants';

function Weekday( { weekday } ) {
	let label;
	switch ( weekday ) {
		case Weekdays.MONDAY: label = 'Monday'; break;
		case Weekdays.TUESDAY: label = 'Tuesday'; break;
		case Weekdays.WEDNESDAY: label = 'Wednesday'; break;
		case Weekdays.THURSDAY: label = 'Thursday'; break;
		case Weekdays.FRIDAY: label = 'Friday'; break;
		case Weekdays.SATURDAY: label = 'Saturday'; break;
		case Weekdays.SUNDAY: label = 'Sunday'; break;
	}

	return (
		<span className="weekday">
			{ label }
		</span>
	);
}

Weekday.propTypes = {
	weekday: PropTypes.oneOf( Object.keys( Weekdays ) )
};

export default Weekday;
