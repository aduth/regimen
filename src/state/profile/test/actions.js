/**
 * External dependencies
 */

import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { forEach } from 'lodash';

/**
 * Internal dependencies
 */

import {
	PROFILE_PLAN_ADD,
	PROFILE_PLAN_PROGRESS_SET,
	PROFILE_PLAN_REMOVE,
	PROFILE_REQUEST,
	PROFILE_REQUEST_SUCCESS,
	PROFILE_UPDATE,
	PROFILE_UPDATE_FAILURE,
	PROFILE_UPDATE_SUCCESS
} from 'state/action-types';

describe( 'actions', () => {
	let profile, spies, actions;

	before( () => {
		spies = {
			dispatch: sinon.spy(),
			getProfileOrDefault: () => {},
			queueRevisions: sinon.stub().returns( Promise.resolve() ),
			successNotice: sinon.spy(),
			errorNotice: sinon.spy()
		};

		sinon.stub( spies, 'getProfileOrDefault', () => Promise.resolve( profile ) );

		actions = proxyquire( '../actions', {
			'db/api/profile': {
				getProfileOrDefault: spies.getProfileOrDefault,
				queueRevisions: spies.queueRevisions
			},
			'state/notices/actions': {
				addSuccessNotice: spies.successNotice,
				addErrorNotice: spies.errorNotice
			}
		} );
	} );

	beforeEach( () => {
		profile = { _id: 'profile' };
		forEach( spies, ( spy ) => spy.reset() );
	} );

	describe( '#requestProfile()', () => {
		it( 'should return an action thunk', () => {
			const action = actions.requestProfile();

			expect( action ).to.be.a( 'function' );
		} );

		it( 'should dispatch with initial request action', () => {
			actions.requestProfile()( spies.dispatch );

			expect( spies.dispatch ).to.have.been.calledWith( {
				type: PROFILE_REQUEST
			} );
		} );

		it( 'should dispatch with success', () => {
			return actions.requestProfile()( spies.dispatch ).then( () => {
				expect( spies.dispatch ).to.have.been.calledWith( {
					type: PROFILE_REQUEST_SUCCESS,
					payload: {
						profile: {
							_id: 'profile'
						}
					}
				} );
			} );
		} );
	} );

	describe( '#updateProfile()', () => {
		it( 'should return an action thunk', () => {
			const action = actions.updateProfile();

			expect( action ).to.be.a( 'function' );
		} );

		it( 'should dispatch with initial update action', () => {
			actions.updateProfile( { ok: true } )( spies.dispatch );

			expect( spies.dispatch ).to.have.been.calledWith( {
				type: PROFILE_UPDATE,
				payload: {
					profile: {
						ok: true
					}
				}
			} );
		} );

		it( 'should dispatch with update success', () => {
			return actions.updateProfile( { ok: true } )( spies.dispatch ).then( () => {
				expect( spies.dispatch ).to.have.been.calledWith(
					actions.updateProfileSuccess( { ok: true } )
				);
			} );
		} );

		it( 'should not dispatch notice by default', () => {
			return actions.updateProfile( { ok: true } )( spies.dispatch ).then( () => {
				expect( spies.successNotice ).to.not.have.been.called;
			} );
		} );

		it( 'should dispatch notice if opted', () => {
			return actions.updateProfile( { ok: true }, true )( spies.dispatch ).then( () => {
				expect( spies.successNotice ).to.have.been.calledOnce;
			} );
		} );
	} );

	describe( '#updateProfileSuccess()', () => {
		it( 'should return expected action object', () => {
			const action = actions.updateProfileSuccess( { ok: true } );

			expect( action ).to.eql( {
				type: PROFILE_UPDATE_SUCCESS,
				payload: {
					profile: {
						ok: true
					}
				}
			} );
		} );
	} );

	describe( '#updateProfileFailure', () => {
		it( 'should return expected action object', () => {
			const error = new Error();
			const action = actions.updateProfileFailure( error );

			expect( action ).to.eql( {
				type: PROFILE_UPDATE_FAILURE,
				error
			} );
		} );
	} );

	describe( '#setProfilePlanProgress()', () => {
		it( 'should return an action thunk', () => {
			const action = actions.setProfilePlanProgress();

			expect( action ).to.be.a( 'function' );
		} );

		it( 'should dispatch with initial update action', () => {
			actions.setProfilePlanProgress( 'kTidUd2g4', 2 )( spies.dispatch );

			expect( spies.dispatch ).to.have.been.calledWith( {
				type: PROFILE_PLAN_PROGRESS_SET,
				payload: {
					planId: 'kTidUd2g4',
					workout: 2
				}
			} );
		} );

		it( 'should dispatch with update success', () => {
			return actions.setProfilePlanProgress( 'kTidUd2g4', 2 )( spies.dispatch ).then( () => {
				expect( spies.getProfileOrDefault ).to.have.been.calledOnce;
				expect( spies.queueRevisions ).to.have.been.calledWith( {
					progress: {
						kTidUd2g4: 2
					}
				} );
				expect( spies.dispatch ).to.have.been.calledWith(
					actions.updateProfileSuccess( {
						progress: {
							kTidUd2g4: 2
						}
					} )
				);
			} );
		} );
	} );

	describe( '#addPlanToProfile()', () => {
		it( 'should return an action thunk', () => {
			const action = actions.addPlanToProfile();

			expect( action ).to.be.a( 'function' );
		} );

		it( 'should dispatch with initial update action', () => {
			actions.addPlanToProfile( 'kTidUd2g4' )( spies.dispatch );

			expect( spies.dispatch ).to.have.been.calledWith( {
				type: PROFILE_PLAN_ADD,
				payload: {
					planId: 'kTidUd2g4'
				}
			} );
		} );

		it( 'should skip update if plan already first in profile', () => {
			profile = Object.assign( {}, profile, {
				plans: [ 'kTidUd2g4' ]
			} );

			return actions.addPlanToProfile( 'kTidUd2g4' )( spies.dispatch ).then( () => {
				expect( spies.getProfileOrDefault ).to.have.been.calledOnce;
				expect( spies.queueRevisions ).to.not.have.been.called;
			} );
		} );

		it( 'should dispatch with update success', () => {
			return actions.addPlanToProfile( 'kTidUd2g4' )( spies.dispatch ).then( () => {
				expect( spies.getProfileOrDefault ).to.have.been.calledOnce;
				expect( spies.queueRevisions ).to.have.been.calledWith( {
					plans: [ 'kTidUd2g4' ]
				} );
				expect( spies.dispatch ).to.have.been.calledWith(
					actions.updateProfileSuccess( {
						plans: [ 'kTidUd2g4' ]
					} )
				);
			} );
		} );
	} );

	describe( '#removePlanFromProfile()', () => {
		it( 'should return an action thunk', () => {
			const action = actions.removePlanFromProfile();

			expect( action ).to.be.a( 'function' );
		} );

		it( 'should dispatch with initial update action', () => {
			actions.removePlanFromProfile( 'kTidUd2g4' )( spies.dispatch );

			expect( spies.dispatch ).to.have.been.calledWith( {
				type: PROFILE_PLAN_REMOVE,
				payload: {
					planId: 'kTidUd2g4'
				}
			} );
		} );

		it( 'should skip update if plan not in profile', () => {
			return actions.removePlanFromProfile( 'kTidUd2g4' )( spies.dispatch ).then( () => {
				expect( spies.getProfileOrDefault ).to.have.been.calledOnce;
				expect( spies.queueRevisions ).to.not.have.been.called;
			} );
		} );

		it( 'should dispatch with update success', () => {
			profile = Object.assign( {}, profile, {
				plans: [ 'kTidUd2g4' ]
			} );

			return actions.removePlanFromProfile( 'kTidUd2g4' )( spies.dispatch ).then( () => {
				expect( spies.getProfileOrDefault ).to.have.been.calledOnce;
				expect( spies.queueRevisions ).to.have.been.calledWith( {
					plans: []
				} );
				expect( spies.dispatch ).to.have.been.calledWith(
					actions.updateProfileSuccess( {
						plans: []
					} )
				);
			} );
		} );
	} );
} );
