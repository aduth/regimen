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

		it( 'should track action type', () => {
			const ga = spy();

			analytics( ga )()( () => {} )( {
				type: 'foo'
			} );

			expect( ga ).to.have.been.calledWith( 'send', 'event', 'Action', 'foo' );
		} );

		it( 'should track internal action types', () => {
			const ga = spy();

			analytics( ga )()( () => {} )( {
				type: '@@foo'
			} );

			expect( ga ).to.not.have.been.called;
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
