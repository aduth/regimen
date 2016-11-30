/**
 * External dependencies
 */

import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */

import databases from './databases/reducer';
import documentHead from './document-head/reducer';
import notices from './notices/reducer';
import plans from './plans/reducer';
import routing from './routing/reducer';
import profile from './profile/reducer';
import ui from './ui/reducer';

export default combineReducers( {
	databases,
	documentHead,
	notices,
	plans,
	routing,
	profile,
	ui
} );
