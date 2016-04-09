/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import { exercises, sets, accessory } from '../';
import { Exercises } from 'routines/constants';

describe( 'madcow', () => {
	describe( '#exercises()', () => {
		it( 'should return expected exercises for monday', () => {
			expect( exercises( 5 ) ).to.eql( [
				Exercises.BENCH_PRESS,
				Exercises.INCLINE_DUMBBELL_BENCH_PRESS,
				Exercises.ROW,
				Exercises.LAT_PULL_DOWN,
				Exercises.OVERHEAD_PRESS,
				Exercises.CURL,
				Exercises.SKULLCRUSHER
			] );
		} );

		it( 'should return expected exercises for tuesday', () => {
			expect( exercises( 6 ) ).to.eql( [
				Exercises.SQUAT,
				Exercises.DEADLIFT,
				Exercises.LEG_PRESS,
				Exercises.LEG_CURL
			] );
		} );

		it( 'should return expected exercises for thursday', () => {
			expect( exercises( 7 ) ).to.eql( [
				Exercises.INCLINE_BENCH_PRESS,
				Exercises.DUMBBELL_FLYE,
				Exercises.CABLE_ROW,
				Exercises.DUMBBELL_ROW,
				Exercises.DUMBBELL_LAT_RAISE,
				Exercises.DUMBBELL_CURL,
				Exercises.TRICEP_EXTENSION
			] );
		} );

		it( 'should return expected exercises for friday', () => {
			expect( exercises( 8 ) ).to.eql( [
				Exercises.FRONT_SQUAT,
				Exercises.LUNGE,
				Exercises.LEG_EXTENSION,
				Exercises.LEG_CURL,
				Exercises.SEATED_CALF_RAISE,
				Exercises.CALF_PRESS
			] );
		} );
	} );

	describe( '#accessory()', () => {
		it( 'should return calf exercise for tuesday', () => {
			const accessories = accessory( 6 );

			expect( accessories ).to.be.an( 'array' );
			expect( accessories ).to.have.length( 1 );
			expect( accessories[ 0 ] ).to.match( /calf exercise/i );
		} );
	} );
} );
