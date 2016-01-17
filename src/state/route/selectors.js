export function getPlanId( state ) {
	return state.route.params.planId;
}

export function getWorkout( state ) {
	return parseInt( state.route.params.workout, 10 );
}
