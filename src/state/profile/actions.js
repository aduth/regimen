/**
 * Internal dependencies
 */

import { getDatabase } from 'db';
import { getProfileOrDefault } from 'db/api/profile';
import {
	PROFILE_ADD_PLAN,
	PROFILE_PLAN_PROGRESS_SET,
	PROFILE_REMOVE_PLAN,
	PROFILE_REQUEST,
	PROFILE_REQUEST_SUCCESS,
	PROFILE_REQUEST_FAILURE,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_FAILURE
} from 'state/action-types';

export function requestProfile() {
	return async ( dispatch ) => {
		dispatch( {
			type: PROFILE_REQUEST
		} );

		try {
			const profile = await getDatabase( 'profile' ).get( 'profile' );
			dispatch( {
				type: PROFILE_REQUEST_SUCCESS,
				payload: { profile }
			} );
		} catch ( error ) {
			dispatch( {
				type: PROFILE_REQUEST_FAILURE,
				error
			} );
		}
	};
}

export function updateProfileSuccess( profile ) {
	return {
		type: PROFILE_UPDATE_SUCCESS,
		payload: { profile }
	};
}

export function updateProfileFailure( error ) {
	return {
		type: PROFILE_UPDATE_FAILURE,
		error
	};
}

export function setProfilePlanProgress( planId, workout ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PROFILE_PLAN_PROGRESS_SET,
			payload: { planId, workout }
		} );

		const db = getDatabase( 'profile' );
		try {
			let profile = await getProfileOrDefault();
			profile.progress[ planId ] = workout;
			await db.put( profile );
			profile = await db.get( 'profile' );
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}

export function addPlanToProfile( planId ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PROFILE_ADD_PLAN,
			payload: { planId }
		} );

		const db = getDatabase( 'profile' );
		try {
			let profile = await getProfileOrDefault();

			const existingIndex = profile.plans.indexOf( planId );
			if ( 0 === existingIndex ) {
				// Skip updating profile if plan is already most recent
				return;
			} else if ( -1 !== existingIndex ) {
				// Remove existing entry before prepending to plans
				profile.plans.splice( existingIndex, 1 );
			}

			profile.plans = [ planId ].concat( profile.plans );
			await db.put( profile );
			profile = await db.get( 'profile' );
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}

export function removePlanFromProfile( planId ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PROFILE_REMOVE_PLAN,
			payload: { planId }
		} );

		const db = getDatabase( 'profile' );
		try {
			let profile = await getProfileOrDefault();

			const existingIndex = profile.plans.indexOf( planId );
			if ( -1 === existingIndex ) {
				// If plan not part of profile, abandon early
				return;
			}

			profile.plans.splice( existingIndex, 1 );
			await db.put( profile );
			profile = await db.get( 'profile' );
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}
