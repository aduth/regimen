/**
 * External dependencies
 */

import React from 'react';
import map from 'lodash/map';

/**
 * Internal dependencies
 */

import RoutineOption from './routine-option';
import * as routines from 'routines';

export default function RoutineOptions() {
	return (
		<ul className="add-via-routine__options">
			{ map( routines, ( routine, key ) => {
				return (
					<li key={ key } className="add-via-routine__options-item">
						<RoutineOption routine={ key } />
					</li>
				);
			} ) }
		</ul>
	);
}
