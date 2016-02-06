export function isRequestingProfile( state ) {
	return state.profile.fetching;
}

export function getProfilePlans( state ) {
	return state.profile.plans;
}

export function getProfilePlanProgress( state, planId ) {
	return state.profile.progress[ planId ];
}
