import { ProgressionTypes, Weekdays, ParameterTypes, Exercises } from 'routines/constants';

export const description = 'Originally created by Bill Starr, the writer of the book “The Strongest Shall Survive” this program is great for adding muscle mass and increasing overall strength and fitness levels.';

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
	const { squat5rm, bench5rm, row5rm, press5rm, deadlift5rm, prWeek, setIncrement, minPlateWeight } = plan.form;
	const week = Math.floor( workout / weekdays.length );
	const weekday = weekdays[ ( workout - 1 ) % weekdays.length ];

	switch ( exercise ) {
		case Exercises.SQUAT:
			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 4 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - setIncrement ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						}
					];

				case Weekdays.WEDNESDAY:
					return [
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 4 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						}
					];

				case Weekdays.FRIDAY:
					return [
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 4 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - setIncrement ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 8,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 3,
							weight: Math.round( ( squat5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						}
					];
			}

		case Exercises.BENCH_PRESS:
			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 4 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - setIncrement ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						}
					];

				case Weekdays.FRIDAY:
					return [
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 4 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - setIncrement ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 8,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 3,
							weight: Math.round( ( bench5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						}
					];
			}

		case Exercises.ROW:
			switch ( weekday ) {
				case Weekdays.MONDAY:
					return [
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 4 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - setIncrement ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						}
					];

				case Weekdays.FRIDAY:
					return [
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 4 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 5,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - setIncrement ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 8,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						},
						{
							reps: 3,
							weight: Math.round( ( row5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
						}
					];
			}

		case Exercises.OVERHEAD_PRESS:
			return [
				{
					reps: 5,
					weight: Math.round( ( press5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
				},
				{
					reps: 5,
					weight: Math.round( ( press5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
				},
				{
					reps: 5,
					weight: Math.round( ( press5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - setIncrement ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
				},
				{
					reps: 5,
					weight: Math.round( ( press5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
				}
			];

		case Exercises.DEADLIFT:
			return [
				{
					reps: 5,
					weight: Math.round( ( deadlift5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 3 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
				},
				{
					reps: 5,
					weight: Math.round( ( deadlift5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - ( setIncrement * 2 ) ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
				},
				{
					reps: 5,
					weight: Math.round( ( deadlift5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) * ( 1 - setIncrement ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
				},
				{
					reps: 5,
					weight: Math.round( ( deadlift5rm * Math.pow( 1 / 1.025, prWeek - 1 ) * Math.pow( 1.025, week - 1 ) ) / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 )
				}
			];
	}
}
