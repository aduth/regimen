/**
 * External dependencies
 */

import Chai from 'chai';
import sinonChai from 'sinon-chai';

describe( 'regimen', () => {
	before( () => {
		Chai.use( sinonChai );
	} );

	describe( 'lib', () => {
		require( 'lib/standalone/test/index' );
	} );

	describe( 'state', () => {
		require( 'state/test/middlewares' );

		describe( 'databases', () => {
			require( 'state/databases/test/actions' );
		} );
	} );
} );
