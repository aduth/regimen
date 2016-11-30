/**
 * Internal dependencies
 */

import { SkillLevels, FocusTypes, ProgressionTypes, Exercises } from 'routines/constants';

/**
 * Program Utility
 */

/**
 * Returns the five repetition maximum equivalent for the user's reported test
 * weight and repetitions.
 *
 * @param  {Number} testWeight User's reported original personal record weight
 * @param  {Number} testReps   User's reported original personal record reps
 * @return {Number}            Equivaelent five repetition maximum
 */
export function getFiveRepMax( testWeight, testReps ) {
	return ( testWeight / ( 1.0278 - ( 0.0278 * testReps ) ) ) * ( 1.0278 - ( 0.0278 * 5 ) );
}

/**
 * Program Constants
 */

/**
 * Program name.
 *
 * @type {String}
 */
export const name = 'Starting Strength';

/**
 * Program author name.
 *
 * @type {String}
 */
export const author = 'Mark Rippetoe';

/**
 * Program description.
 *
 * @type {String}
 */
export const description = 'The Starting Strength System is a distillation of Mark Rippetoe\'s' +
	' experiences over three and a half decades as a competitive powerlifter, Olympic' +
	' weightlifting coach, and gym owner.';

/**
 * Program external resource URL.
 *
 * @type {String}
 */
export const external = 'http://www.amazon.com/gp/product/0982522738/?tag=regimen07a-20';

/**
 * Program minimum skill level.
 *
 * @type {SkillLevel}
 */
export const skill = SkillLevels.BEGINNER;

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
export const progression = ProgressionTypes.SESSIONS;

/**
 * Number of sessions comprising a progression.
 *
 * @type {Number}
 */
export const sessions = 2;

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
			exercises: {
				title: 'Exercise settings',
				description: 'For each exercise, provide your current maximum weight and' +
					' repetitions. Then, configure the desired increment pace.',
				type: 'object',
				properties: {
					squat: {
						title: 'Squat',
						type: 'object',
						required: [ 'weight', 'reps', 'increment' ],
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
							},
							increment: {
								title: 'Weight increase',
								type: 'integer',
								'default': 5
							}
						}
					},
					bench: {
						title: 'Bench Press',
						type: 'object',
						required: [ 'weight', 'reps', 'increment' ],
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
							},
							increment: {
								title: 'Weight increase',
								type: 'integer',
								'default': 5
							}
						}
					},
					deadlift: {
						title: 'Deadlift',
						type: 'object',
						required: [ 'weight', 'reps', 'increment' ],
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
							},
							increment: {
								title: 'Weight increase',
								type: 'integer',
								'default': 10
							}
						}
					},
					press: {
						title: 'Overhead Press',
						type: 'object',
						required: [ 'weight', 'reps', 'increment' ],
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
							},
							increment: {
								title: 'Weight increase',
								type: 'integer',
								'default': 5
							}
						}
					},
					clean: {
						title: 'Power Clean',
						type: 'object',
						required: [ 'weight', 'reps', 'increment' ],
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
							},
							increment: {
								title: 'Weight increase',
								type: 'integer',
								'default': 5
							}
						}
					}
				}
			}
		}
	},
	weights: [
		'exercises.squat.weight',
		'exercises.squat.increment',
		'exercises.bench.weight',
		'exercises.bench.increment',
		'exercises.deadlift.weight',
		'exercises.deadlift.increment',
		'exercises.press.weight',
		'exercises.press.increment',
		'exercises.clean.weight',
		'exercises.clean.increment'
	],
	uiSchema: {
		exercises: {
			squat: {
				classNames: 'form__inline-flex'
			},
			bench: {
				classNames: 'form__inline-flex'
			},
			deadlift: {
				classNames: 'form__inline-flex'
			},
			press: {
				classNames: 'form__inline-flex'
			},
			clean: {
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
	switch ( ( workout - 1 ) % 2 ) {
		case 0:
			return [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.DEADLIFT
			];

		case 1:
			return [
				Exercises.SQUAT,
				Exercises.OVERHEAD_PRESS,
				Exercises.POWER_CLEAN
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
	const { squat, bench, deadlift, press, clean } = plan.exercises;

	switch ( exercise ) {
		case Exercises.SQUAT:
			const squat5rm = getFiveRepMax( squat.weight, squat.reps );
			const squatWeight = squat5rm + ( ( workout - 1 ) * squat.increment );
			return [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 0.4 * squatWeight },
				{ reps: 3, weight: 0.6 * squatWeight },
				{ reps: 2, weight: 0.8 * squatWeight },
				{ reps: 5, weight: squatWeight },
				{ reps: 5, weight: squatWeight },
				{ reps: 5, weight: squatWeight }
			];

		case Exercises.BENCH_PRESS:
			const bench5rm = getFiveRepMax( bench.weight, bench.reps );
			const benchWeight = bench5rm + ( ( workout - 1 ) * 0.5 * bench.increment );
			return [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 0.5 * benchWeight },
				{ reps: 3, weight: 0.7 * benchWeight },
				{ reps: 2, weight: 0.9 * benchWeight },
				{ reps: 5, weight: benchWeight },
				{ reps: 5, weight: benchWeight },
				{ reps: 5, weight: benchWeight }
			];

		case Exercises.DEADLIFT:
			const deadlift5rm = getFiveRepMax( deadlift.weight, deadlift.reps );
			const deadliftWeight = deadlift5rm + ( ( workout - 1 ) * 0.5 * deadlift.increment );
			return [
				{ reps: 5, weight: 0.4 * deadliftWeight },
				{ reps: 5, weight: 0.4 * deadliftWeight },
				{ reps: 3, weight: 0.6 * deadliftWeight },
				{ reps: 2, weight: 0.85 * deadliftWeight },
				{ reps: 5, weight: deadliftWeight }
			];

		case Exercises.OVERHEAD_PRESS:
			const press5rm = getFiveRepMax( press.weight, press.reps );
			const pressWeight = press5rm + ( ( workout - 2 ) * 0.5 * press.increment );
			return [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 0.55 * pressWeight },
				{ reps: 3, weight: 0.7 * pressWeight },
				{ reps: 2, weight: 0.85 * pressWeight },
				{ reps: 5, weight: pressWeight },
				{ reps: 5, weight: pressWeight },
				{ reps: 5, weight: pressWeight }
			];

		case Exercises.POWER_CLEAN:
			const clean5rm = getFiveRepMax( clean.weight, clean.reps );
			const cleanWeight = clean5rm + ( ( workout - 2 ) * 0.5 * clean.increment );
			return [
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 45 },
				{ reps: 5, weight: 0.55 * cleanWeight },
				{ reps: 3, weight: 0.7 * cleanWeight },
				{ reps: 2, weight: 0.85 * cleanWeight },
				{ reps: 3, weight: cleanWeight },
				{ reps: 3, weight: cleanWeight },
				{ reps: 3, weight: cleanWeight },
				{ reps: 3, weight: cleanWeight },
				{ reps: 3, weight: cleanWeight }
			];
	}

	return [];
}
