/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import { exercises, sets } from '../';
import { Exercises } from 'routines/constants';

describe( 'stronglifts', () => {
	describe( '#exercises()', () => {
		it( 'should return squat, bench press, and row for workout A', () => {
			expect( exercises( 5 ) ).to.eql( [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			] );
		} );

		it( 'should return squat, overhead press, and deadlift for workout B', () => {
			expect( exercises( 6 ) ).to.eql( [
				Exercises.SQUAT,
				Exercises.OVERHEAD_PRESS,
				Exercises.DEADLIFT
			] );
		} );
	} );

	describe( '#sets()', () => {
		const plan = {
			start: {
				squat: 45,
				bench: 45,
				row: 65,
				deadlift: 95,
				press: 45
			}
		};

		it( 'should return an accurate workout A squat workout', () => {
			expect( sets( plan, 9, Exercises.SQUAT ) ).to.eql( [
				{ reps: 5, weight: 85 },
				{ reps: 5, weight: 85 },
				{ reps: 5, weight: 85 },
				{ reps: 5, weight: 85 },
				{ reps: 5, weight: 85 }
			] );
		} );

		it( 'should return an accurate workout A bench press workout', () => {
			expect( sets( plan, 9, Exercises.BENCH_PRESS ) ).to.eql( [
				{ reps: 5, weight: 65 },
				{ reps: 5, weight: 65 },
				{ reps: 5, weight: 65 },
				{ reps: 5, weight: 65 },
				{ reps: 5, weight: 65 }
			] );
		} );

		it( 'should return an accurate workout A row workout', () => {
			expect( sets( plan, 9, Exercises.ROW ) ).to.eql( [
				{ reps: 5, weight: 85 },
				{ reps: 5, weight: 85 },
				{ reps: 5, weight: 85 },
				{ reps: 5, weight: 85 },
				{ reps: 5, weight: 85 }
			] );
		} );

		it( 'should return an accurate workout B squat workout', () => {
			expect( sets( plan, 10, Exercises.SQUAT ) ).to.eql( [
				{ reps: 5, weight: 90 },
				{ reps: 5, weight: 90 },
				{ reps: 5, weight: 90 },
				{ reps: 5, weight: 90 },
				{ reps: 5, weight: 90 }
			] );
		} );

		it( 'should return an accurate workout B overhead press workout', () => {
			expect( sets( plan, 10, Exercises.OVERHEAD_PRESS ) ).to.eql( [
				{ reps: 5, weight: 65 },
				{ reps: 5, weight: 65 },
				{ reps: 5, weight: 65 },
				{ reps: 5, weight: 65 },
				{ reps: 5, weight: 65 }
			] );
		} );

		it( 'should return an accurate workout B deadlift workout', () => {
			expect( sets( plan, 10, Exercises.DEADLIFT ) ).to.eql( [
				{ reps: 5, weight: 135 },
				{ reps: 5, weight: 135 },
				{ reps: 5, weight: 135 },
				{ reps: 5, weight: 135 },
				{ reps: 5, weight: 135 }
			] );
		} );
	} );
} );
