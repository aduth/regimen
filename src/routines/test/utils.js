/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import { Weekdays } from '../constants';
import { getWeekday } from '../utils';

describe( 'utils', () => {
	describe( '#getWeekday()', () => {
		it( 'should return the expected weekday', () => {
			const weekday = getWeekday( [
				Weekdays.MONDAY,
				Weekdays.WEDNESDAY,
				Weekdays.FRIDAY
			], 11 );

			expect( weekday ).to.equal( Weekdays.WEDNESDAY );
		} );
	} );
} );
