/**
 * External dependencies
 */

import { expect } from 'chai';
import { spy } from 'sinon';
import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Internal dependencies
 */

import { analytics, pageView } from '../middlewares';

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
				type: LOCATION_CHANGE,
				payload: {
					pathname: '/foo'
				}
			} );

			expect( ga ).to.have.been.calledWith( 'send', 'pageview', '/foo' );
		} );
	} );
} );
