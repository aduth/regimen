/**
 * Internal dependencies
 */

import { SkillLevels, FocusTypes, ProgressionTypes, Weekdays, Exercises } from 'routines/constants';
import { getWeekday } from 'routines/utils';

/**
 * Program Utility
 */

/**
 * Returns the day's maximum weight for an exercise.
 *
 * @param  {Number} testWeight Users reported original personal record weight
 * @param  {Number} testReps   Users reported original personal record reps
 * @param  {Number} week       Current week
 * @param  {Number} prWeek     Week during which personal record should be achieved
 * @return {Number}            Day's maximum weight
 */
export function getMax( testWeight, testReps, week, prWeek ) {
	return (
		( ( testWeight / ( 1.0278 - ( 0.0278 * testReps ) ) ) * ( 1.0278 - ( 0.0278 * 5 ) ) ) *
		Math.pow( 1 / 1.025, prWeek - 1 ) *
		Math.pow( 1.025, week - 1 )
	);
}

/**
 * Program Constants
 */

/**
 * Program name.
 *
 * @type {String}
 */
export const name = 'Madcow 5x5';

/**
 * Program author name.
 *
 * @type {String}
 */
export const author = 'Bill Starr';

/**
 * Program description.
 *
 * @type {String}
 */
export const description = 'Originally created by Bill Starr, the writer of the book "The' +
	' Strongest Shall Survive" this program is great for adding muscle mass and increasing' +
	' overall strength and fitness levels.';

/**
 * Program external resource URL.
 *
 * @type {String}
 */
export const external = 'http://stronglifts.com/madcow/5x5_Program/Linear_5x5.htm';

/**
 * Program minimum skill level.
 *
 * @type {SkillLevel}
 */
export const skill = SkillLevels.INTERMEDIATE;

/**
 * Program focus type.
 *
 * @type {FocusType}
 */
export const focus = FocusTypes.STRENGTH;

/**
 * Program progression type.
 *
 * @type {ProgressionType}
 */
export const progression = ProgressionTypes.WEEKLY;

/**
 * Days of the week for which the routine is performed.
 *
 * @type {Weekday[]}
 */
export const weekdays = [
	Weekdays.MONDAY,
	Weekdays.WEDNESDAY,
	Weekdays.FRIDAY
];

/**
 * Form schema and UI schema from which a set of form fields are generated.
 * Properties of the form schema are saved as plan properties, to be used in
 * generating the routine exercises. All weight paths are defined such that the
 * weight can be normalized to the preferred unit upon save and display.
 *
 * @type {Object}
 */
export const form = {
	schema: {
		type: 'object',
		properties: {
			prWeek: {
				title: 'Personal record week',
				description: 'Week during which you should reach your current personal record',
				type: 'integer',
				'default': 4,
				minimum: 1
			},
			setIncrement: {
				title: 'Set increment percentage',
				description: 'Weight increase percentage between sets',
				type: 'number',
				'default': 12,
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
								'default': 0
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								'default': 0
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
								'default': 0
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								'default': 0
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
								'default': 0
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								'default': 0
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
								'default': 0
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								'default': 0
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
								'default': 0
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								'default': 0
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

/**
 * Returns an array of exercises to be performed for the specified workout.
 *
 * @param  {Number}     workout Workout (1-based index)
 * @return {Exercise[]}         Exercises
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

/**
 * Returns an array of set objects to be performed for the workout exercise. A
 * set object describes reps and weight.
 *
 * @param  {Object}   plan     Plan form object
 * @param  {Number}   workout  Workout (1-based index)
 * @param  {Exercise} exercise Exercise
 * @return {Object[]}          Array of set objects to be performed
 */
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

/**
 * Returns an array of recommended accessory work for the specified workout.
 *
 * @param  {Number}   workout Workout (1-based index)
 * @return {String[]}         Array of accessory recommendations
 */
export function accessory( workout ) {
	switch ( getWeekday( weekdays, workout ) ) {
		case Weekdays.MONDAY:
			return [
				'Weighted hyperextension (2 sets)',
				'Weighted sit-ups (2 sets)'
			];

		case Weekdays.WEDNESDAY:
			return [
				'Sit-ups (3 sets)'
			];

		case Weekdays.FRIDAY:
			return [
				'Weighted dips (3 sets, 5-8 reps)',
				'Barbell curls (3 sets)',
				'Triceps extensions (3 sets, 8 reps)'
			];
	}
}
