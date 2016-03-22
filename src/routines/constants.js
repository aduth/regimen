/**
 * Supported focus types for a routine.
 *
 * @type {Object}
 * @enum {FocusType}
 */
export const FocusTypes = {
	STRENGTH: 'STRENGTH',
	HYPERTROPHY: 'HYPERTROPHY',
	ENDURANCE: 'ENDURANCE'
};

/**
 * Supported progression types for a routine.
 *
 * @type {Object}
 * @enum {ProgressionType}
 */
export const ProgressionTypes = {
	WEEKLY: 'WEEKLY',
	DAILY: 'DAILY',
	SESSIONS: 'SESSIONS'
};

/**
 * Supported skill levels for a routine.
 *
 * @type {Object}
 * @enum {SkillLevels}
 */
export const SkillLevels = {
	BEGINNER: 'BEGINNER',
	INTERMEDIATE: 'INTERMEDIATE',
	ADVANCED: 'ADVANCED'
};

/**
 * Days of the week.
 *
 * @type {Object}
 * @enum {Weekday}
 */
export const Weekdays = {
	MONDAY: 'MONDAY',
	TUESDAY: 'TUESDAY',
	WEDNESDAY: 'WEDNESDAY',
	THURSDAY: 'THURSDAY',
	FRIDAY: 'FRIDAY',
	SATURDAY: 'SATURDAY',
	SUNDAY: 'SUNDAY'
};

/**
 * Supported exercises for a routine.
 *
 * @type {Object}
 * @enum {Exercise}
 */
export const Exercises = {
	SQUAT: 'SQUAT',
	BENCH_PRESS: 'BENCH_PRESS',
	ROW: 'ROW',
	OVERHEAD_PRESS: 'OVERHEAD_PRESS',
	DEADLIFT: 'DEADLIFT',
	POWER_CLEAN: 'POWER_CLEAN'
};
