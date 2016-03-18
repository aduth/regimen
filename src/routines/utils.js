/**
 * Returns the weekday for the specified workout.
 *
 * @param  {Weekday[]} weekdays Routine weekdays
 * @param  {Number}    workout  Workout
 * @return {Weekday}            Weekday
 */
export function getWeekday( weekdays, workout ) {
	return weekdays[ ( workout - 1 ) % weekdays.length ];
}
