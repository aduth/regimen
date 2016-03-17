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
	queueRevisions
} from 'db/api/profile';
import {
	PROFILE_PLAN_ADD,
	PROFILE_PLAN_PROGRESS_SET,
	PROFILE_PLAN_REMOVE,
	PROFILE_REQUEST,
	PROFILE_REQUEST_SUCCESS,
	PROFILE_REQUEST_FAILURE,
	PROFILE_UPDATE,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_FAILURE
} from 'state/action-types';
import { addSuccessNotice, addErrorNotice } from 'state/notices/actions';

/**
 * Returns an action thunk, dispatching progress of an attempt to request the
 * current profile.
 *
 * @return {Function} Action thunk
 */
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

/**
 * Returns an action thunk, dispatching progress of an attempt to request the
 * current profile.
 *
 * @param  {Object}   profile    Profile attributes to update
 * @param  {Boolean}  showNotice Whether to display notice on update completion
 * @return {Function}            Action thunk
 */
export function updateProfile( profile, showNotice = false ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PROFILE_UPDATE,
			payload: { profile }
		} );

		try {
			await queueRevisions( profile );
			dispatch( updateProfileSuccess( profile ) );
			if ( showNotice ) {
				dispatch( addSuccessNotice( 'Profile updated successfully' ) );
			}
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
			if ( showNotice ) {
				dispatch( addErrorNotice( 'Profile failed to update' ) );
			}
		}
	};
}

/**
 * Returns an action object signalling that the profile has been updated
 * successfully.
 *
 * @param  {Object} profile Updated profile
 * @return {Object}         Action object
 */
export function updateProfileSuccess( profile ) {
	return {
		type: PROFILE_UPDATE_SUCCESS,
		payload: { profile }
	};
}

/**
 * Returns an action object signalling that the profile had failed to be
 * updated.
 *
 * @param  {Object} error Error object
 * @return {Object}       Action object
 */
export function updateProfileFailure( error ) {
	return {
		type: PROFILE_UPDATE_FAILURE,
		error
	};
}

/**
 * Returns an action thunk, dispatching progress of an attempt to set the
 * workout progress for a plan.
 *
 * @param  {String}   planId  Plan ID
 * @param  {Number}   workout Workout
 * @return {Function}       Action thunk
 */
export function setProfilePlanProgress( planId, workout ) {
	return async ( dispatch ) => {
		dispatch( {
			type: PROFILE_PLAN_PROGRESS_SET,
			payload: { planId, workout }
		} );

		try {
			let profile = await getProfileOrDefault();
			const progress = Object.assign( {}, profile.progress, {
				[ planId ]: workout
			} );
			await queueRevisions( { progress } );
			profile = await getProfileOrDefault();
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}

/**
 * Returns an action thunk, dispatching progress of an attempt to add a plan to
 * the profile.
 *
 * @param  {String}   planId  Plan ID
 * @return {Function}         Action thunk
 */
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

			const plans = [ planId ].concat( without( profile.plans, planId ) );
			await queueRevisions( { plans } );
			profile = await getProfileOrDefault();
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}

/**
 * Returns an action thunk, dispatching progress of an attempt to remove a plan
 * from the profile.
 *
 * @param  {String}   planId  Plan ID
 * @return {Function}         Action thunk
 */
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

			const plans = without( profile.plans, planId );
			await setProfilePlanProgress( planId, undefined );
			await queueRevisions( { plans } );
			profile = await getProfileOrDefault();
			dispatch( updateProfileSuccess( profile ) );
		} catch ( error ) {
			dispatch( updateProfileFailure( error ) );
		}
	};
}
