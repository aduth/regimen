/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import {
	isRequestingProfile,
	hasProfileLoaded,
	getProfilePlans,
	getProfilePlanProgress,
	isProfileImperialUnit,
	getProfileMinPlate
} from '../selectors';

describe( 'selectors', () => {
	describe( '#isRequestingProfile()', () => {
		it( 'should return whether profile is fetching', () => {
			const isRequesting = isRequestingProfile( {
				profile: {
					fetching: true
				}
			} );

			expect( isRequesting ).to.be.true;
		} );
	} );

	describe( '#hasProfileLoaded()', () => {
		it( 'should return whether profile has loaded', () => {
			const hasLoaded = hasProfileLoaded( {
				profile: {
					loaded: true
				}
			} );

			expect( hasLoaded ).to.be.true;
		} );
	} );

	describe( '#getProfilePlans()', () => {
		it( 'should return profile plans', () => {
			const plans = getProfilePlans( {
				profile: {
					plans: []
				}
			} );

			expect( plans ).to.eql( [] );
		} );
	} );

	describe( '#getProfilePlanProgress()', () => {
		it( 'should return null if plan is not tracked', () => {
			const progress = getProfilePlanProgress( {
				profile: {
					progress: {}
				}
			}, 'kTidUd2g4' );

			expect( progress ).to.be.null
		} );

		it( 'should return profile progress for specified plan', () => {
			const progress = getProfilePlanProgress( {
				profile: {
					progress: {
						kTidUd2g4: 4
					}
				}
			}, 'kTidUd2g4' );

			expect( progress ).to.equal( 4 );
		} );
	} );

	describe( '#isProfileImperialUnit()', () => {
		it( 'should return profile imperial unit', () => {
			const imperial = isProfileImperialUnit( {
				profile: {
					imperial: true
				}
			} );

			expect( imperial ).to.be.true;
		} );
	} );

	describe( '#getProfileMinPlate()', () => {
		it( 'should return profile minimum plate', () => {
			const minPlate = getProfileMinPlate( {
				profile: {
					minPlate: 2.5
				}
			} );

			expect( minPlate ).to.equal( 2.5 );
		} );
	} );
} );
