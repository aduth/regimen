/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import values from 'lodash/values';

/**
 * Internal dependencies
 */

import { ProgressionTypes } from 'routines/constants';

function ProgressionLabel( { progression } ) {
	let label;
	switch ( progression ) {
		case ProgressionTypes.DAILY:
			label = 'Daily';
			break;

		case ProgressionTypes.WEEKLY:
			label = 'Weekly';
			break;

		default:
			label = 'Unknown';
	}

	return (
		<span className="progression-label">
			{ label }
		</span>
	);
}

ProgressionLabel.propTypes = {
	progression: PropTypes.oneOf( values( ProgressionTypes ) )
}

export default ProgressionLabel;
