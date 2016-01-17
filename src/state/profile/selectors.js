export function isRequestingProfile( state ) {
	return state.profile.fetching;
}

export function getProfile( state ) {
	return state.profile.profile;
}
