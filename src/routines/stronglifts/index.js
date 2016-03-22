/**
 * Internal dependencies
 */

import { SkillLevels, FocusTypes, ProgressionTypes, Exercises } from 'routines/constants';

/**
 * Program Constants
 */

/**
 * Program name.
 *
 * @type {String}
 */
export const name = 'Stronglifts 5x5';

/**
 * Program author name.
 *
 * @type {String}
 */
export const author = 'Mehdi';

/**
 * Program description.
 *
 * @type {String}
 */
export const description = 'Stronglifts 5x5 is the simplest, most effective workout to get stronger, build muscle and burn fat. The program is easy to follow and only takes three workouts a week of about 45 minutes.';

/**
 * Program external resource URL.
 *
 * @type {String}
 */
export const external = 'http://stronglifts.com/';

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
			start: {
				title: 'Starting weights',
				description: 'For each exercise, provide your desired starting weight',
				type: 'object',
				properties: {
					squat: {
						title: 'Squat',
						type: 'integer',
						minimum: 1,
						default: 45
					},
					bench: {
						title: 'Bench Press',
						type: 'integer',
						minimum: 1,
						default: 45
					},
					row: {
						title: 'Row',
						type: 'integer',
						minimum: 1,
						default: 65
					},
					deadlift: {
						title: 'Deadlift',
						type: 'integer',
						minimum: 1,
						default: 95
					},
					press: {
						title: 'Overhead Press',
						type: 'integer',
						minimum: 1,
						default: 45
					}
				}
			}
		}
	},
	weights: [
		'start.squat',
		'start.bench',
		'start.row',
		'start.deadlift',
		'start.press'
	],
	uiSchema: {
		start: {
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
	switch ( ( workout - 1 ) % 2 ) {
		case 0:
			return [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			];

		case 1:
			return [
				Exercises.SQUAT,
				Exercises.OVERHEAD_PRESS,
				Exercises.DEADLIFT
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
	const { start } = plan;

	switch ( exercise ) {
		case Exercises.SQUAT:
			const squatWeight = ( ( workout - 1 ) * 5 ) + start.squat;
			return [
				{ reps: 5, weight: squatWeight },
				{ reps: 5, weight: squatWeight },
				{ reps: 5, weight: squatWeight },
				{ reps: 5, weight: squatWeight },
				{ reps: 5, weight: squatWeight }
			];

		case Exercises.BENCH_PRESS:
			const benchWeight = ( ( workout - 1 ) * 2.5 ) + start.bench;
			return [
				{ reps: 5, weight: benchWeight },
				{ reps: 5, weight: benchWeight },
				{ reps: 5, weight: benchWeight },
				{ reps: 5, weight: benchWeight },
				{ reps: 5, weight: benchWeight }
			];

		case Exercises.ROW:
			const rowWeight = ( ( workout - 1 ) * 2.5 ) + start.row;
			return [
				{ reps: 5, weight: rowWeight },
				{ reps: 5, weight: rowWeight },
				{ reps: 5, weight: rowWeight },
				{ reps: 5, weight: rowWeight },
				{ reps: 5, weight: rowWeight }
			];

		case Exercises.OVERHEAD_PRESS:
			const pressWeight = ( ( workout - 2 ) * 2.5 ) + start.press;
			return [
				{ reps: 5, weight: pressWeight },
				{ reps: 5, weight: pressWeight },
				{ reps: 5, weight: pressWeight },
				{ reps: 5, weight: pressWeight },
				{ reps: 5, weight: pressWeight }
			];

		case Exercises.DEADLIFT:
			const deadliftWeight = ( ( workout - 2 ) * 5 ) + start.deadlift;
			return [
				{ reps: 5, weight: deadliftWeight },
				{ reps: 5, weight: deadliftWeight },
				{ reps: 5, weight: deadliftWeight },
				{ reps: 5, weight: deadliftWeight },
				{ reps: 5, weight: deadliftWeight }
			];
	}

	return [];
}
