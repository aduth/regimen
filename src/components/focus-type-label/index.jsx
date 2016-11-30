/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { values } from 'lodash';

/**
 * Internal dependencies
 */

import { FocusTypes } from 'routines/constants';

function FocusTypeLabel( { focus } ) {
	let label;
	switch ( focus ) {
		case FocusTypes.STRENGTH:
			label = 'Strength';
			break;

		case FocusTypes.HYPERTROPHY:
			label = 'Hypertrophy';
			break;

		case FocusTypes.ENDURANCE:
			label = 'Endurance';
			break;

		default:
			label = 'Unknown';
	}

	return (
		<span className="focus-type-label">
			{ label }
		</span>
	);
}

FocusTypeLabel.propTypes = {
	focus: PropTypes.oneOf( values( FocusTypes ) )
};

export default FocusTypeLabel;
