/**
 * Internal dependencies
 */

import { HEADER_OPTIONS_ACTIVE_TOGGLE } from 'state/action-types';

/**
 * Returns an action object signalling that the header options active state
 * should be toggled.
 *
 * @return {Object} Action object
 */
export function toggleHeaderOptionsActive() {
	return {
		type: HEADER_OPTIONS_ACTIVE_TOGGLE
	};
}
