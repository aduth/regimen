/**
 * Internal dependencies
 */

import { FocusTypes, ProgressionTypes, Weekdays, Exercises } from 'routines/constants';
import { getWeekday } from 'routines/utils';

/**
 * Program Utility
 */

function getMax( testWeight, testReps, week, prWeek ) {
	return ( ( ( testWeight / ( 1.0278 - ( 0.0278 * testReps ) ) ) * ( 1.0278 - ( 0.0278 * 5 ) ) ) * Math.pow( 1 / 1.025, prWeek - 1 ) ) * Math.pow( 1.025, week - 1 );
}

/**
 * Program Constants
 */

export const name = 'Madcow 5x5';

export const description = 'Originally created by Bill Starr, the writer of the book "The Strongest Shall Survive" this program is great for adding muscle mass and increasing overall strength and fitness levels.';

export const focus = FocusTypes.STRENGTH;

export const progression = ProgressionTypes.WEEKLY;

export const weekdays = [
	Weekdays.MONDAY,
	Weekdays.WEDNESDAY,
	Weekdays.FRIDAY
];

export const form = {
	schema: {
		type: 'object',
		properties: {
			prWeek: {
				title: 'Personal record week',
				description: 'Week during which you should reach your current personal record',
				type: 'integer',
				default: 4,
				minimum: 1
			},
			setIncrement: {
				title: 'Set increment percentage',
				description: 'Weight increase percentage between sets',
				type: 'number',
				default: 12,
				minimum: 1,
				maximum: 100,
				multipleOf: 1
			},
			tests: {
				title: 'Current maximums',
				description: 'For each exercise, provide your current maximum weight and repetitions',
				type: 'object',
				properties: {
					squat: {
						title: 'Squat',
						type: 'object',
						required: [ 'weight', 'reps' ],
						properties: {
							weight: {
								title: 'Weight',
								type: 'integer',
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer'
							}
						}
					},
					bench: {
						title: 'Bench Press',
						type: 'object',
						required: [ 'weight', 'reps' ],
						properties: {
							weight: {
								title: 'Weight',
								type: 'integer',
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer'
							}
						}
					},
					row: {
						title: 'Row',
						type: 'object',
						required: [ 'weight', 'reps' ],
						properties: {
							weight: {
								title: 'Weight',
								type: 'integer',
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer'
							}
						}
					},
					deadlift: {
						title: 'Deadlift',
						type: 'object',
						required: [ 'weight', 'reps' ],
						properties: {
							weight: {
								title: 'Weight',
								type: 'integer',
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer'
							}
						}
					},
					press: {
						title: 'Overhead Press',
						type: 'object',
						required: [ 'weight', 'reps' ],
						properties: {
							weight: {
								title: 'Weight',
								type: 'integer',
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer'
							}
						}
					}
				}
			}
		}
	},
	weights: [
		'tests.squat.weight',
		'tests.bench.weight',
		'tests.row.weight',
		'tests.deadlift.weight',
		'tests.press.weight'
	],
	uiSchema: {
		tests: {
			squat: {
				classNames: 'form__inline-flex'
			},
			bench: {
				classNames: 'form__inline-flex'
			},
			row: {
				classNames: 'form__inline-flex'
			},
			deadlift: {
				classNames: 'form__inline-flex'
			},
			press: {
				classNames: 'form__inline-flex'
			}
		}
	}
};

/**
 * Program Generators
 */

export function exercises( workout ) {
	switch ( getWeekday( weekdays, workout ) ) {
		case Weekdays.MONDAY:
			return [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			];

		case Weekdays.WEDNESDAY:
			return [
				Exercises.SQUAT,
				Exercises.OVERHEAD_PRESS,
				Exercises.DEADLIFT
			];

		case Weekdays.FRIDAY:
			return [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			];
	}
}

export function sets( plan, workout, exercise ) {
	const { prWeek, setIncrement, tests } = plan;
	const week = Math.floor( ( workout - 1 ) / weekdays.length ) + 1;
	const weekday = weekdays[ ( workout - 1 ) % weekdays.length ];
	const setIncrementPct = setIncrement / 100;

	switch ( exercise ) {
		case Exercises.SQUAT:
			const squatMax = getMax( tests.squat.weight, tests.squat.reps, week, prWeek );
			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 4 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 3 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 2 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - setIncrementPct ) },
						{ reps: 5, weight: squatMax }
					];

				case Weekdays.WEDNESDAY:
					return [
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 4 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 3 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 2 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 2 ) ) }
					];

				case Weekdays.FRIDAY:
					return [
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 4 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 3 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - ( setIncrementPct * 2 ) ) },
						{ reps: 5, weight: squatMax * ( 1 - setIncrementPct ) },
						{ reps: 3, weight: getMax( tests.squat.weight, tests.squat.reps, week + 1, prWeek ) },
						{ reps: 8, weight: squatMax * ( 1 - ( setIncrementPct * 2 ) ) }
					];
			}

		case Exercises.BENCH_PRESS:
			const benchMax = getMax( tests.bench.weight, tests.bench.reps, week, prWeek );
			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{ reps: 5, weight: benchMax * ( 1 - ( setIncrementPct * 4 ) ) },
						{ reps: 5, weight: benchMax * ( 1 - ( setIncrementPct * 3 ) ) },
						{ reps: 5, weight: benchMax * ( 1 - ( setIncrementPct * 2 ) ) },
						{ reps: 5, weight: benchMax * ( 1 - setIncrementPct ) },
						{ reps: 5, weight: benchMax }
					];

				case Weekdays.FRIDAY:
					return [
						{ reps: 5, weight: benchMax * ( 1 - ( setIncrementPct * 4 ) ) },
						{ reps: 5, weight: benchMax * ( 1 - ( setIncrementPct * 3 ) ) },
						{ reps: 5, weight: benchMax * ( 1 - ( setIncrementPct * 2 ) ) },
						{ reps: 5, weight: benchMax * ( 1 - setIncrementPct ) },
						{ reps: 3, weight: getMax( tests.bench.weight, tests.bench.reps, week + 1, prWeek ) },
						{ reps: 8, weight: benchMax * ( 1 - ( setIncrementPct * 2 ) ) }
					];
			}

		case Exercises.ROW:
			const rowMax = getMax( tests.row.weight, tests.row.reps, week, prWeek );
			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{ reps: 5, weight: rowMax * ( 1 - ( setIncrementPct * 4 ) ) },
						{ reps: 5, weight: rowMax * ( 1 - ( setIncrementPct * 3 ) ) },
						{ reps: 5, weight: rowMax * ( 1 - ( setIncrementPct * 2 ) ) },
						{ reps: 5, weight: rowMax * ( 1 - setIncrementPct ) },
						{ reps: 5, weight: rowMax }
					];

				case Weekdays.FRIDAY:
					return [
						{ reps: 5, weight: rowMax * ( 1 - ( setIncrementPct * 4 ) ) },
						{ reps: 5, weight: rowMax * ( 1 - ( setIncrementPct * 3 ) ) },
						{ reps: 5, weight: rowMax * ( 1 - ( setIncrementPct * 2 ) ) },
						{ reps: 5, weight: rowMax * ( 1 - setIncrementPct ) },
						{ reps: 3, weight: getMax( tests.row.weight, tests.row.reps, week + 1, prWeek ) },
						{ reps: 8, weight: rowMax * ( 1 - ( setIncrementPct * 2 ) ) }
					];
			}

		case Exercises.OVERHEAD_PRESS:
			const pressMax = getMax( tests.press.weight, tests.press.reps, week, prWeek );
			return [
				{ reps: 5, weight: pressMax * ( 1 - ( setIncrementPct * 3 ) ) },
				{ reps: 5, weight: pressMax * ( 1 - ( setIncrementPct * 2 ) ) },
				{ reps: 5, weight: pressMax * ( 1 - setIncrementPct ) },
				{ reps: 5, weight: pressMax }
			];

		case Exercises.DEADLIFT:
			const deadliftMax = getMax( tests.deadlift.weight, tests.deadlift.reps, week, prWeek );
			return [
				{ reps: 5, weight: deadliftMax * ( 1 - ( setIncrementPct * 3 ) ) },
				{ reps: 5, weight: deadliftMax * ( 1 - ( setIncrementPct * 2 ) ) },
				{ reps: 5, weight: deadliftMax * ( 1 - setIncrementPct ) },
				{ reps: 5, weight: deadliftMax }
			];
	}

	return [];
}
