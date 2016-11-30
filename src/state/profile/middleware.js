/**
 * External dependencies
 */

import { partial, includes } from 'lodash';

/**
 * Internal dependencies
 */

import {
	PLAN_RECEIVE,
	ROUTE_PATH_PUSH
} from 'state/action-types';
import { getMatchedRoute } from 'state/routing/selectors';
import { getPlan } from 'state/plans/selectors';
import { addPlanToProfile, setProfilePlanProgress } from './actions';
import { getProfilePlans } from './selectors';

/**
 * Returns true if passed action type which can potentially change the current
 * plan.
 *
 * @type {Boolean}
 */
const isPlanChangingType = partial( includes, [ PLAN_RECEIVE, ROUTE_PATH_PUSH ] );

export function trackProfilePlans( { dispatch, getState } ) {
	return ( next ) => ( action ) => {
		const result = next( action );

		if ( ! isPlanChangingType( action.type ) ) {
			return result;
		}

		const state = getState();
		const params = getMatchedRoute( state ).params;
		const { planId } = params;
		if ( ! planId ) {
			return result;
		}

		// Check to make sure that we don't add to profile unless we're certain
		// that the plan is valid
		const plan = getPlan( state, planId );
		if ( ! plan ) {
			return result;
		}

		// If plan is valid and not already the most recently visited plan,
		// save to profile
		if ( planId !== getProfilePlans( state )[ 0 ] ) {
			dispatch( addPlanToProfile( planId ) );
		}

		// If progress exists in path, save progress
		const workout = parseInt( params.workout, 10 );
		if ( workout > 0 ) {
			dispatch( setProfilePlanProgress( planId, workout ) );
		}

		return result;
	};
}
