/**
 * External dependencies
 */

import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */

import {
	PROFILE_PLAN_ADD,
	PROFILE_PLAN_PROGRESS_SET,
	PROFILE_PLAN_REMOVE,
	PROFILE_REQUEST,
	PROFILE_REQUEST_FAILURE,
	PROFILE_REQUEST_SUCCESS,
	PROFILE_UPDATE
} from 'state/action-types';
import reducer, { fetching, progress, plans, imperial, minPlate } from '../reducer';

describe( 'reducer', () => {
	it( 'should include the expected keys in return value', () => {
		expect( reducer( undefined, {} ) ).to.have.keys( [
			'fetching',
			'progress',
			'plans',
			'imperial',
			'minPlate'
		] );
	} );

	describe( '#fetching()', () => {
		it( 'should default to false', () => {
			const state = fetching( undefined, {} );

			expect( state ).to.be.false;
		} );

		it( 'should be true when request starts', () => {
			const state = fetching( undefined, {
				type: PROFILE_REQUEST
			} );

			expect( state ).to.be.true;
		} );

		it( 'should be false when request succeeds', () => {
			const state = fetching( undefined, {
				type: PROFILE_REQUEST_SUCCESS
			} );

			expect( state ).to.be.false;
		} );

		it( 'should be false when request fails', () => {
			const state = fetching( undefined, {
				type: PROFILE_REQUEST_FAILURE
			} );

			expect( state ).to.be.false;
		} );
	} );

	describe( '#progress()', () => {
		it( 'should default to an empty object', () => {
			const state = progress( undefined, {} );

			expect( state ).to.eql( {} );
		} );

		it( 'should set value from profile update', () => {
			const state = progress( undefined, {
				type: PROFILE_UPDATE,
				payload: {
					profile: {
						progress: {
							kTidUd2g4: 1
						}
					}
				}
			} );

			expect( state ).to.eql( {
				kTidUd2g4: 1
			} );
		} );

		it( 'should set value from progress set', () => {
			const state = progress( undefined, {
				type: PROFILE_PLAN_PROGRESS_SET,
				payload: {
					planId: 'kTidUd2g4',
					workout: 1
				}
			} );

			expect( state ).to.eql( {
				kTidUd2g4: 1
			} );
		} );

		it( 'should override plan value from progress set', () => {
			const state = progress( deepFreeze( {
				kTidUd2g4: 1
			} ), {
				type: PROFILE_PLAN_PROGRESS_SET,
				payload: {
					planId: 'kTidUd2g4',
					workout: 2
				}
			} );

			expect( state ).to.eql( {
				kTidUd2g4: 2
			} );
		} );

		it( 'should merge values from progress set', () => {
			const state = progress( deepFreeze( {
				kTidUd2g4: 2
			} ), {
				type: PROFILE_PLAN_PROGRESS_SET,
				payload: {
					planId: 'TidUd2g4k',
					workout: 4
				}
			} );

			expect( state ).to.eql( {
				kTidUd2g4: 2,
				TidUd2g4k: 4
			} );
		} );

		it( 'should remove progress on plan remove', () => {
			const state = progress( deepFreeze( {
				kTidUd2g4: 2
			} ), {
				type: PROFILE_PLAN_REMOVE,
				payload: {
					planId: 'kTidUd2g4'
				}
			} );

			expect( state ).to.eql( {} );
		} );
	} );

	describe( '#plans()', () => {
		it( 'should default to an empty array', () => {
			const state = plans( undefined, {} );

			expect( state ).to.eql( [] );
		} );

		it( 'should set value from profile update', () => {
			const state = plans( undefined, {
				type: PROFILE_UPDATE,
				payload: {
					profile: {
						plans: [ 'kTidUd2g4' ]
					}
				}
			} );

			expect( state ).to.eql( [ 'kTidUd2g4' ] );
		} );

		it( 'should include added plan', () => {
			const state = plans( undefined, {
				type: PROFILE_PLAN_ADD,
				payload: {
					planId: 'kTidUd2g4'
				}
			} );

			expect( state ).to.eql( [ 'kTidUd2g4' ] );
		} );

		it( 'should prefix added plan with existing', () => {
			const state = plans( deepFreeze( [ 'kTidUd2g4' ] ), {
				type: PROFILE_PLAN_ADD,
				payload: {
					planId: 'TidUd2g4k'
				}
			} );

			expect( state ).to.eql( [ 'TidUd2g4k', 'kTidUd2g4' ] );
		} );

		it( 'should avoid duplicated plan additions', () => {
			const state = plans( deepFreeze( [ 'kTidUd2g4', 'TidUd2g4k' ] ), {
				type: PROFILE_PLAN_ADD,
				payload: {
					planId: 'TidUd2g4k'
				}
			} );

			expect( state ).to.eql( [ 'TidUd2g4k', 'kTidUd2g4' ] );
		} );

		it( 'should exclude removed plan', () => {
			const state = plans( deepFreeze( [ 'kTidUd2g4', 'TidUd2g4k' ] ), {
				type: PROFILE_PLAN_REMOVE,
				payload: {
					planId: 'kTidUd2g4'
				}
			} );

			expect( state ).to.eql( [ 'TidUd2g4k' ] );
		} );

		it( 'should have no effect on removing non-existing plan', () => {
			const state = plans( deepFreeze( [ 'TidUd2g4k' ] ), {
				type: PROFILE_PLAN_REMOVE,
				payload: {
					planId: 'kTidUd2g4'
				}
			} );

			expect( state ).to.eql( [ 'TidUd2g4k' ] );
		} );
	} );

	describe( '#imperial()', () => {
		it( 'should default to true', () => {
			const state = imperial( undefined, {} );

			expect( state ).to.be.true;
		} );

		it( 'should set value from profile update', () => {
			const state = imperial( undefined, {
				type: PROFILE_UPDATE,
				payload: {
					profile: {
						imperial: false
					}
				}
			} );

			expect( state ).to.be.false;
		} );
	} );

	describe( '#minPlate()', () => {
		it( 'should default to 2.5', () => {
			const state = minPlate( undefined, {} );

			expect( state ).to.equal( 2.5 );
		} );

		it( 'should set value from profile update', () => {
			const state = minPlate( undefined, {
				type: PROFILE_UPDATE,
				payload: {
					profile: {
						minPlate: 1
					}
				}
			} );

			expect( state ).to.equal( 1 );
		} );
	} );
} );
