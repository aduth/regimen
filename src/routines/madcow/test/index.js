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
		it( 'should return squat, bench press, and row for monday', () => {
			expect( exercises( 4 ) ).to.eql( [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			] );
		} );

		it( 'should return squat, overhead press, and deadlift for wednesday', () => {
			expect( exercises( 5 ) ).to.eql( [
				Exercises.SQUAT,
				Exercises.OVERHEAD_PRESS,
				Exercises.DEADLIFT
			] );
		} );

		it( 'should return squat, bench press, and row for friday', () => {
			expect( exercises( 6 ) ).to.eql( [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			] );
		} );
	} );

	describe( '#sets()', () => {
		const plan = {
			prWeek: 3,
			setIncrement: 12,
			minPlateWeight: 2.5,
			tests: {
				squat: {
					weight: 285,
					reps: 5
				},
				bench: {
					weight: 247,
					reps: 5
				},
				row: {
					weight: 145,
					reps: 5
				},
				deadlift: {
					weight: 335,
					reps: 5
				},
				press: {
					weight: 130,
					reps: 5
				}
			}
		};

		it( 'should return an accurate monday squat workout', () => {
			expect( sets( plan, 10, Exercises.SQUAT ) ).to.eql( [
				{ reps: 5, weight: 151.905 },
				{ reps: 5, weight: 186.96 },
				{ reps: 5, weight: 222.01500000000001 },
				{ reps: 5, weight: 257.07 },
				{ reps: 5, weight: 292.125 }
			] );
		} );

		it( 'should return an accurate monday bench press workout', () => {
			expect( sets( plan, 10, Exercises.BENCH_PRESS ) ).to.eql( [
				{ reps: 5, weight: 131.651 },
				{ reps: 5, weight: 162.032 },
				{ reps: 5, weight: 192.413 },
				{ reps: 5, weight: 222.794 },
				{ reps: 5, weight: 253.175 }
			] );
		} );

		it( 'should return an accurate monday row workout', () => {
			expect( sets( plan, 10, Exercises.ROW ) ).to.eql( [
				{ reps: 5, weight: 77.285 },
				{ reps: 5, weight: 95.12 },
				{ reps: 5, weight: 112.955 },
				{ reps: 5, weight: 130.79 },
				{ reps: 5, weight: 148.625 }
			] );
		} );

		it( 'should return an accurate wednesday squat workout', () => {
			expect( sets( plan, 11, Exercises.SQUAT ) ).to.eql( [
				{ reps: 5, weight: 151.905 },
				{ reps: 5, weight: 186.96 },
				{ reps: 5, weight: 222.01500000000001 },
				{ reps: 5, weight: 222.01500000000001 }
			] );
		} );

		it( 'should return an accurate wednesday overhead press workout', () => {
			expect( sets( plan, 11, Exercises.OVERHEAD_PRESS ) ).to.eql( [
				{ reps: 5, weight: 85.28 },
				{ reps: 5, weight: 101.27 },
				{ reps: 5, weight: 117.26 },
				{ reps: 5, weight: 133.25 }
			] );
		} );

		it( 'should return an accurate wednesday deadlift workout', () => {
			expect( sets( plan, 11, Exercises.DEADLIFT ) ).to.eql( [
				{ reps: 5, weight: 219.76 },
				{ reps: 5, weight: 260.965 },
				{ reps: 5, weight: 302.17 },
				{ reps: 5, weight: 343.375 }
			] );
		} );

		it( 'should return an accurate friday squat workout', () => {
			expect( sets( plan, 12, Exercises.SQUAT ) ).to.eql( [
				{ reps: 5, weight: 151.905 },
				{ reps: 5, weight: 186.96 },
				{ reps: 5, weight: 222.01500000000001 },
				{ reps: 5, weight: 257.07 },
				{ reps: 3, weight: 299.42812499999997 },
				{ reps: 8, weight: 222.01500000000001 }
			] );
		} );

		it( 'should return an accurate friday bench press workout', () => {
			expect( sets( plan, 12, Exercises.BENCH_PRESS ) ).to.eql( [
				{ reps: 5, weight: 131.651 },
				{ reps: 5, weight: 162.032 },
				{ reps: 5, weight: 192.413 },
				{ reps: 5, weight: 222.794 },
				{ reps: 3, weight: 259.504375 },
				{ reps: 8, weight: 192.413 }
			] );
		} );

		it( 'should return an accurate friday row workout', () => {
			expect( sets( plan, 12, Exercises.ROW ) ).to.eql( [
				{ reps: 5, weight: 77.285 },
				{ reps: 5, weight: 95.12 },
				{ reps: 5, weight: 112.955 },
				{ reps: 5, weight: 130.79 },
				{ reps: 3, weight: 152.340625 },
				{ reps: 8, weight: 112.955 }
			] );
		} );
	} );

	describe( '#accessory()', () => {
		it( 'should return hyperextension and sit-ups for monday', () => {
			const accessories = accessory( 4 );

			expect( accessories ).to.be.an( 'array' );
			expect( accessories ).to.have.length( 2 );
			expect( accessories[ 0 ] ).to.match( /hyperextension/i );
			expect( accessories[ 1 ] ).to.match( /sit-ups/i );
		} );

		it( 'should return sit-ups for wednesday', () => {
			const accessories = accessory( 5 );

			expect( accessories ).to.be.an( 'array' );
			expect( accessories ).to.have.length( 1 );
			expect( accessories[ 0 ] ).to.match( /sit-ups/i );
		} );

		it( 'should return dips, curls, and triceps extensions for friday', () => {
			const accessories = accessory( 6 );

			expect( accessories ).to.be.an( 'array' );
			expect( accessories ).to.have.length( 3 );
			expect( accessories[ 0 ] ).to.match( /dips/i );
			expect( accessories[ 1 ] ).to.match( /curls/i );
			expect( accessories[ 2 ] ).to.match( /triceps extensions/i );
		} );
	} );
} );
