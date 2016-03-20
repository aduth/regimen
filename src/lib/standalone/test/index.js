/**
 * External dependencies
 */

import { expect } from 'chai';

/**
 * Internal dependencies
 */

import { isStandalone, isIos } from '../';

describe( 'standalone', () => {
	beforeEach( () => {
		global.navigator = {};
	} );

	describe( '#isStandalone', () => {
		it( 'should return false if not standalone navigator', () => {
			global.navigator.standalone = undefined;

			expect( isStandalone() ).to.be.false;
		} );

		it( 'should return true if standalone navigator', () => {
			global.navigator.standalone = true;

			expect( isStandalone() ).to.be.true;
		} );
	} );

	describe( '#isIos', () => {
		it( 'should return false for a non-iOS user agent', () => {
			global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';

			expect( isIos() ).to.be.false;
		} );

		it( 'should return true for an iPhone user agent', () => {
			global.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3';

			expect( isIos() ).to.be.true;
		} );

		it( 'should return true for an iPad user agent', () => {
			global.navigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3';

			expect( isIos() ).to.be.true;
		} );

		it( 'should return true for an iPod user agent', () => {
			global.navigator.userAgent = 'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3';

			expect( isIos() ).to.be.true;
		} );
	} );
} );
