/**
 * External dependencies
 */
import includes from 'lodash/includes';
import without from 'lodash/without';

/**
 * Internal dependencies
 */

import { getDatabase } from 'db';
import {
	getProfileOrDefault,
	queueValidatingPut
} from 'db/api/profile';
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

		try {
			let profile = await getProfileOrDefault();
			profile.progress[ planId ] = workout;
			await queueValidatingPut( profile );
			profile = await getProfileOrDefault();
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

		try {
			let profile = await getProfileOrDefault();
			if ( planId === profile.plans[ 0 ] ) {
				return;
			}

			profile.plans = [ planId ].concat( without( profile.plans, planId ) );
			await queueValidatingPut( profile );
			profile = await getProfileOrDefault();
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

		try {
			let profile = await getProfileOrDefault();
			if ( ! includes( profile.plans, planId ) ) {
				return;
			}

			profile.plans = without( profile.plans, planId );
			delete profile.progress[ planId ];
			await queueValidatingPut( profile );
			profile = await getProfileOrDefault();
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}
