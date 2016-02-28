/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import AddViaRoutine from '../add-via-routine';
import AddViaId from '../add-via-id';

export default function NewPlanSelection() {
	return (
		<div>
			<AddViaRoutine />
			<AddViaId />
		</div>
	);
}
