/**
 * Internal dependencies
 */

import { SkillLevels, FocusTypes, ProgressionTypes, Weekdays, Exercises } from 'routines/constants';
import { getWeekday } from 'routines/utils';

/**
 * Program Constants
 */

/**
 * Program name.
 *
 * @type {String}
 */
export const name = 'Power Hypertrophy Upper Lower (PHUL)';

/**
 * Program author name.
 *
 * @type {String}
 */
export const author = 'Brandon Campbell';

/**
 * Program description.
 *
 * @type {String}
 */
export const description = 'The PHUL routine focuses on the principles of both strength and size. It is a four-day adaptable program emphasizing frequency, compound movements, power, and hypertrophy.';

/**
 * Program external resource URL.
 *
 * @type {String}
 */
export const external = 'https://www.muscleandstrength.com/workouts/phul-workout';

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
export const focus = FocusTypes.HYPERTROPHY;

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
	Weekdays.TUESDAY,
	Weekdays.THURSDAY,
	Weekdays.FRIDAY
];

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
				Exercises.BENCH_PRESS,
				Exercises.INCLINE_DUMBBELL_BENCH_PRESS,
				Exercises.ROW,
				Exercises.LAT_PULL_DOWN,
				Exercises.OVERHEAD_PRESS,
				Exercises.CURL,
				Exercises.SKULLCRUSHER
			];

		case Weekdays.TUESDAY:
			return [
				Exercises.SQUAT,
				Exercises.DEADLIFT,
				Exercises.LEG_PRESS,
				Exercises.LEG_CURL
			];

		case Weekdays.THURSDAY:
			return [
				Exercises.INCLINE_BENCH_PRESS,
				Exercises.DUMBBELL_FLYE,
				Exercises.CABLE_ROW,
				Exercises.DUMBBELL_ROW,
				Exercises.DUMBBELL_LAT_RAISE,
				Exercises.DUMBBELL_CURL,
				Exercises.TRICEP_EXTENSION
			];

		case Weekdays.FRIDAY:
			return [
				Exercises.FRONT_SQUAT,
				Exercises.LUNGE,
				Exercises.LEG_EXTENSION,
				Exercises.LEG_CURL,
				Exercises.SEATED_CALF_RAISE,
				Exercises.CALF_PRESS
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
	switch ( exercise ) {
		case Exercises.BENCH_PRESS:
			switch ( getWeekday( weekdays, workout ) ) {
				case Weekdays.MONDAY:
					return [
						{ reps: 5, minReps: 3 },
						{ reps: 5, minReps: 3 },
						{ reps: 5, minReps: 3 },
						{ reps: 5, minReps: 3, optional: true }
					];
			}

		case Exercises.INCLINE_DUMBBELL_BENCH_PRESS:
			return [
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6, optional: true }
			];

		case Exercises.ROW:
			return [
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3, optional: true }
			];

		case Exercises.LAT_PULL_DOWN:
			return [
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6, optional: true }
			];

		case Exercises.OVERHEAD_PRESS:
			return [
				{ reps: 8, minReps: 5 },
				{ reps: 8, minReps: 5 },
				{ reps: 8, minReps: 5, optional: true }
			];

		case Exercises.CURL:
			return [
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6, optional: true }
			];

		case Exercises.SKULLCRUSHER:
			return [
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6 },
				{ reps: 10, minReps: 6, optional: true }
			];

		case Exercises.SQUAT:
			return [
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3, optional: true }
			];

		case Exercises.DEADLIFT:
			return [
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3 },
				{ reps: 5, minReps: 3, optional: true }
			];

		case Exercises.LEG_PRESS:
			return [
				{ reps: 15, minReps: 10 },
				{ reps: 15, minReps: 10 },
				{ reps: 15, minReps: 10 },
				{ reps: 15, minReps: 10, optional: true },
				{ reps: 15, minReps: 10, optional: true }
			];

		case Exercises.LEG_CURL:
			switch ( getWeekday( weekdays, workout ) ) {
				case Weekdays.TUESDAY:
					return [
						{ reps: 10, minReps: 6 },
						{ reps: 10, minReps: 6 },
						{ reps: 10, minReps: 6 },
						{ reps: 10, minReps: 6, optional: true }
					];

				case Weekdays.FRIDAY:
					return [
						{ reps: 15, minReps: 10 },
						{ reps: 15, minReps: 10 },
						{ reps: 15, minReps: 10 },
						{ reps: 15, minReps: 10, optional: true }
					];
			}

		case Exercises.INCLINE_BENCH_PRESS:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.DUMBBELL_FLYE:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.CABLE_ROW:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.DUMBBELL_ROW:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.DUMBBELL_LAT_RAISE:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.DUMBBELL_CURL:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.TRICEP_EXTENSION:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.FRONT_SQUAT:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.LUNGE:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.LEG_EXTENSION:
			return [
				{ reps: 15, minReps: 10 },
				{ reps: 15, minReps: 10 },
				{ reps: 15, minReps: 10 },
				{ reps: 15, minReps: 10, optional: true }
			];

		case Exercises.SEATED_CALF_RAISE:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
			];

		case Exercises.CALF_PRESS:
			return [
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8 },
				{ reps: 12, minReps: 8, optional: true }
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
		case Weekdays.TUESDAY:
			return [
				'Calf Exercise (4 sets of 6-10 reps)'
			];
	}

	return [];
}
