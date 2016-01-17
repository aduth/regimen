/**
 * External dependencies
 */

import without from 'lodash/array/without';

/**
 * Internal dependencies
 */

import { getDatabase } from 'db';
import { getProfileOrDefault } from 'db/api/profile';
import {
	PROFILE_ADD_PLAN,
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

export function addPlanToProfile( planId ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PROFILE_ADD_PLAN,
			payload: { planId }
		} );

		const db = getDatabase( 'profile' );
		try {
			let profile = await getProfileOrDefault();
			profile.plans = [ planId ].concat( without( profile.plans, planId ) );
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
			profile.plans = without( profile.plans, planId );
			await db.put( profile );
			profile = await db.get( 'profile' );
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}
