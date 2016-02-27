/**
 * Internal dependencies
 */

import { roundToNearestPlate } from 'lib/weight';
import { FocusTypes, ProgressionTypes, Weekdays, ParameterTypes, Exercises } from 'routines/constants';

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

export const form = [
	{
		type: ParameterTypes.TEST,
		name: 'bp',
		label: 'Bench Press'
	},
	{
		type: ParameterTypes.NUMBER,
		name: 'prWeek',
		label: 'Personal record match week',
		description: 'The week during which you want to match your previous personal record',
		default: 4
	},
	{
		type: ParameterTypes.PERCENT,
		name: 'setInterval',
		label: 'Set Interval',
		description: 'The percentage increase of weight between your sets',
		default: 0.12
	}
];

/**
 * Program Generators
 */

export function exercises( workout ) {
	workout = workout % weekdays.length;

	switch ( workout ) {
		case 1:
			return [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			];

		case 2:
			return [
				Exercises.SQUAT,
				Exercises.OVERHEAD_PRESS,
				Exercises.DEADLIFT
			];

		case 0:
			return [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			];
	}
}

export function sets( plan, workout, exercise ) {
	const { prWeek, setIncrement, minPlateWeight } = plan.form;
	const week = Math.floor( ( workout - 1 ) / weekdays.length ) + 1;
	const weekday = weekdays[ ( workout - 1 ) % weekdays.length ];

	switch ( exercise ) {
		case Exercises.SQUAT:
			const { testSquatWeight, testSquatReps } = plan.form;
			const squatMax = getMax( testSquatWeight, testSquatReps, week, prWeek );
			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 4 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - setIncrement ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax, minPlateWeight )
						}
					];

				case Weekdays.WEDNESDAY:
					return [
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 4 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						}
					];

				case Weekdays.FRIDAY:
					return [
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 4 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( squatMax * ( 1 - setIncrement ), minPlateWeight )
						},
						{
							reps: 3,
							weight: roundToNearestPlate( getMax( testSquatWeight, testSquatReps, week + 1, prWeek ), minPlateWeight )
						},
						{
							reps: 8,
							weight: roundToNearestPlate( squatMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						}
					];
			}

		case Exercises.BENCH_PRESS:
			const { testBenchWeight, testBenchReps } = plan.form;
			const benchMax = getMax( testBenchWeight, testBenchReps, week, prWeek );

			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax * ( 1 - ( setIncrement * 4 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax * ( 1 - setIncrement ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax, minPlateWeight )
						}
					];

				case Weekdays.FRIDAY:
					return [
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax * ( 1 - ( setIncrement * 4 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( benchMax * ( 1 - setIncrement ), minPlateWeight )
						},
						{
							reps: 3,
							weight: roundToNearestPlate( getMax( testBenchWeight, testBenchReps, week + 1, prWeek ), minPlateWeight )
						},
						{
							reps: 8,
							weight: roundToNearestPlate( benchMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						}
					];
			}

		case Exercises.ROW:
			const { testRowWeight, testRowReps } = plan.form;
			const rowMax = getMax( testRowWeight, testRowReps, week, prWeek );

			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax * ( 1 - ( setIncrement * 4 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax * ( 1 - setIncrement ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax, minPlateWeight )
						}
					];

				case Weekdays.FRIDAY:
					return [
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax * ( 1 - ( setIncrement * 4 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						},
						{
							reps: 5,
							weight: roundToNearestPlate( rowMax * ( 1 - setIncrement ), minPlateWeight )
						},
						{
							reps: 3,
							weight: roundToNearestPlate( getMax( testRowWeight, testRowReps, week + 1, prWeek ), minPlateWeight )
						},
						{
							reps: 8,
							weight: roundToNearestPlate( rowMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
						}
					];
			}

		case Exercises.OVERHEAD_PRESS:
			const { testPressWeight, testPressReps } = plan.form;
			const pressMax = getMax( testPressWeight, testPressReps, week, prWeek );

			return [
				{
					reps: 5,
					weight: roundToNearestPlate( pressMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
				},
				{
					reps: 5,
					weight: roundToNearestPlate( pressMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
				},
				{
					reps: 5,
					weight: roundToNearestPlate( pressMax * ( 1 - setIncrement ), minPlateWeight )
				},
				{
					reps: 5,
					weight: roundToNearestPlate( pressMax, minPlateWeight )
				}
			];

		case Exercises.DEADLIFT:
			const { testDeadliftWeight, testDeadliftReps } = plan.form;
			const deadliftMax = getMax( testDeadliftWeight, testDeadliftReps, week, prWeek );

			return [
				{
					reps: 5,
					weight: roundToNearestPlate( deadliftMax * ( 1 - ( setIncrement * 3 ) ), minPlateWeight )
				},
				{
					reps: 5,
					weight: roundToNearestPlate( deadliftMax * ( 1 - ( setIncrement * 2 ) ), minPlateWeight )
				},
				{
					reps: 5,
					weight: roundToNearestPlate( deadliftMax * ( 1 - setIncrement ), minPlateWeight )
				},
				{
					reps: 5,
					weight: roundToNearestPlate( deadliftMax, minPlateWeight )
				}
			];
	}
}
