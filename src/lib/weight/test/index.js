/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import { roundToNearestPlate, toKilograms, toPounds } from '../';

describe( 'weight', () => {
	describe( '#roundToNearestPlate()', () => {
		it( 'should round down to the nearest plate', () => {
			const nearest = roundToNearestPlate( 227, 2.5 );

			expect( nearest ).to.equal( 225 );
		} );

		it( 'should round up to the nearest plate', () => {
			const nearest = roundToNearestPlate( 227.8, 2.5 );

			expect( nearest ).to.equal( 230 );
		} );
	} );

	describe( '#toKilograms()', () => {
		it( 'should convert pounds to kilograms', () => {
			expect( toKilograms( 2.2046226218 ) ).to.equal( 1 );
		} );
	} );

	describe( '#toPounds()', () => {
		it( 'should convert kilograms to pounds', () => {
			expect( toPounds( 1 ) ).to.equal( 2.2046226218 );
		} );
	} );
} );
