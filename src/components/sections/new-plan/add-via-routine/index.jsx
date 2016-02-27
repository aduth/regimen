/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Block from 'components/ui/block';
import RoutineOptions from './routine-options';

export default function AddViaRoutine() {
	return (
		<Block title="Choose a Routine">
			<RoutineOptions />
		</Block>
	);
}
