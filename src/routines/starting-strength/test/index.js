/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import { exercises, sets } from '../';
import { Exercises } from 'routines/constants';

describe( 'starting strength', () => {
	describe( '#exercises()', () => {
		it( 'should return squat, bench press, and deadlift for workout A', () => {
			expect( exercises( 5 ) ).to.eql( [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.DEADLIFT
			] );
		} );

		it( 'should return squat, overhead press, and power clean for workout B', () => {
			expect( exercises( 6 ) ).to.eql( [
				Exercises.SQUAT,
				Exercises.OVERHEAD_PRESS,
				Exercises.POWER_CLEAN
			] );
		} );
	} );

	describe( '#sets()', () => {
		const plan = {
			exercises: {
				squat: {
					weight: 285,
					reps: 5,
					increment: 5
				},
				bench: {
					weight: 247,
					reps: 5,
					increment: 5
				},
				deadlift: {
					weight: 335,
					reps: 5,
					increment: 10
				},
				press: {
					weight: 130,
					reps: 5,
					increment: 5
				},
				clean: {
					weight: 130,
					reps: 5,
					increment: 5
				}
			}
		};

		it( 'should return an accurate workout A squat workout', () => {
			expect( sets( plan, 9, Exercises.SQUAT ) ).to.eql( [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 130 },
				{ reps: 3, weight: 195 },
				{ reps: 2, weight: 260 },
				{ reps: 5, weight: 325 },
				{ reps: 5, weight: 325 },
				{ reps: 5, weight: 325 }
			] );
		} );

		it( 'should return an accurate workout A bench press workout', () => {
			expect( sets( plan, 9, Exercises.BENCH_PRESS ) ).to.eql( [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 133.5 },
				{ reps: 3, weight: 186.89999999999998 },
				{ reps: 2, weight: 240.3 },
				{ reps: 5, weight: 267 },
				{ reps: 5, weight: 267 },
				{ reps: 5, weight: 267 }
			] );
		} );

		it( 'should return an accurate workout A row workout', () => {
			expect( sets( plan, 9, Exercises.DEADLIFT ) ).to.eql( [
				{ reps: 5, weight: 150 },
				{ reps: 5, weight: 150 },
				{ reps: 3, weight: 225 },
				{ reps: 2, weight: 318.75 },
				{ reps: 5, weight: 375 }
			] );
		} );

		it( 'should return an accurate workout B squat workout', () => {
			expect( sets( plan, 10, Exercises.SQUAT ) ).to.eql( [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 132 },
				{ reps: 3, weight: 198 },
				{ reps: 2, weight: 264 },
				{ reps: 5, weight: 330 },
				{ reps: 5, weight: 330 },
				{ reps: 5, weight: 330 }
			] );
		} );

		it( 'should return an accurate workout B overhead press workout', () => {
			expect( sets( plan, 10, Exercises.OVERHEAD_PRESS ) ).to.eql( [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 82.5 },
				{ reps: 3, weight: 105 },
				{ reps: 2, weight: 127.5 },
				{ reps: 5, weight: 150 },
				{ reps: 5, weight: 150 },
				{ reps: 5, weight: 150 }
			] );
		} );

		it( 'should return an accurate workout B deadlift workout', () => {
			expect( sets( plan, 10, Exercises.POWER_CLEAN ) ).to.eql( [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 82.5 },
				{ reps: 3, weight: 105 },
				{ reps: 2, weight: 127.5 },
				{ reps: 3, weight: 150 },
				{ reps: 3, weight: 150 },
				{ reps: 3, weight: 150 },
				{ reps: 3, weight: 150 },
				{ reps: 3, weight: 150 }
			] );
		} );
	} );
} );
