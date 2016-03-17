/**
 * Internal dependencies
 */

import { NOTICE_ADD, NOTICE_REMOVE } from 'state/action-types';

/**
 * Constants
 */

const DEFAULT_DURATION = 4000;

/**
 * Returns an action thunk, dispatching progress of a notice being active
 * within the global state.
 *
 * @param  {(Object|String)} options Notice text or details
 * @return {Function}                Action thunk
 */
export function addNotice( options ) {
	return ( dispatch, getState ) => {
		if ( 'string' === typeof options ) {
			options = {
				text: options,
				info: true
			};
		}

		options = Object.assign( {}, options, {
			id: getState().notices.nextId
		} );

		dispatch( {
			type: NOTICE_ADD,
			payload: options
		} );

		setTimeout( () => {
			dispatch( dismissNotice( options.id ) );
		}, options.duration || DEFAULT_DURATION );
	}
}

/**
 * Returns an action thunk, dispatching progress of a success notice being
 * active within the global state.
 *
 * @param  {String}   text Notice text
 * @return {Function}      Action thunk
 */
export function addSuccessNotice( text ) {
	return addNotice( {
		text,
		success: true
	} );
}

/**
 * Returns an action thunk, dispatching progress of an error notice being
 * active within the global state.
 *
 * @param  {String}   text Notice text
 * @return {Function}      Action thunk
 */
export function addErrorNotice( text ) {
	return addNotice( {
		text,
		error: true
	} );
}

/**
 * Returns an action thunk, dispatching progress of an info notice being active
 * within the global state.
 *
 * @param  {String}   text Notice text
 * @return {Function}      Action thunk
 */
export function addInfoNotice( text ) {
	return addNotice( {
		text,
		info: true
	} );
}

/**
 * Returns an action object, signalling that a notice should be removed.
 *
 * @param  {*}      noticeId Notice ID
 * @return {Object}          Action thunk
 */
export function dismissNotice( noticeId ) {
	return {
		type: NOTICE_REMOVE,
		payload: { noticeId }
	}
}
