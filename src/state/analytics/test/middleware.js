/**
 * External dependencies
 */

import { expect } from 'chai';
import { spy } from 'sinon';

/**
 * Internal dependencies
 */

import { ROUTE_PATH_PUSH } from 'state/action-types';
import { analytics, pageView } from '../middleware';

describe( 'middlewares', () => {
	describe( '#analytics()', () => {
		it( 'should return a middleware function', () => {
			const next = spy();

			analytics( () => {} )()( next )( {} );

			expect( next ).to.have.been.calledOnce;
		} );

		it( 'should not track actions without analytics meta', () => {
			const ga = spy();

			analytics( ga )()( () => {} )( {
				type: 'foo'
			} );

			expect( ga ).to.not.have.been.called;
		} );

		it( 'should track actions with analytics meta', () => {
			const ga = spy();

			analytics( ga )()( () => {} )( {
				type: 'foo',
				meta: {
					analytics: {
						action: 'Tested middleware',
						label: 'Success',
						value: 1
					}
				}
			} );

			expect( ga ).to.have.been.calledWith(
				'send', 'event', 'Action', 'Tested middleware', 'Success', 1
			);
		} );
	} );

	describe( '#pageView()', () => {
		it( 'should return a middleware function', () => {
			const next = spy();

			pageView( () => {} )()( next )( {} );

			expect( next ).to.have.been.calledOnce;
		} );

		it( 'should track location change pathname', () => {
			const ga = spy();

			pageView( ga )()( () => {} )( {
				type: ROUTE_PATH_PUSH,
				path: '/foo'
			} );

			expect( ga ).to.have.been.calledWith( 'send', 'pageview', '/foo' );
		} );
	} );
} );
