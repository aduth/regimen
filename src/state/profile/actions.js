/**
 * External dependencies
 */
import includes from 'lodash/collection/includes';
import without from 'lodash/array/without';

/**
 * Internal dependencies
 */

import { getDatabase } from 'db';
import { getProfileOrDefault } from 'db/api/profile';
import {
	PROFILE_PLAN_ADD,
	PROFILE_PLAN_PROGRESS_SET,
	PROFILE_PLAN_REMOVE,
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
			type: PROFILE_PLAN_ADD,
			payload: { planId }
		} );

		const db = getDatabase( 'profile' );
		try {
			let profile = await getProfileOrDefault();
			if ( planId === profile.plans[ 0 ] ) {
				return;
			}

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
			type: PROFILE_PLAN_REMOVE,
			payload: { planId }
		} );

		const db = getDatabase( 'profile' );
		try {
			let profile = await getProfileOrDefault();
			if ( ! includes( profile.plans, planId ) ) {
				return;
			}

			profile.plans = without( profile.plans, planId );
			delete profile.progress[ planId ];
			await db.put( profile );
			profile = await db.get( 'profile' );
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}
