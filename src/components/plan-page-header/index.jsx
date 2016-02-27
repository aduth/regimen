/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';

/**
 * Internal dependencies
 */

import { getPlanId } from 'state/ui/selectors';
import { getPlan, isPlanNotFound } from 'state/plans/selectors';

function PlanPageHeader( { title, loading, notFound } ) {
	const classes = classNames( 'plan-page-header', {
		'is-loading': loading
	} );

	if ( loading ) {
		title = 'Loading';
	} else if ( notFound ) {
		title = 'Not Found';
	}

	return (
		<span className={ classes }>
			{ title }
		</span>
	);
}

PlanPageHeader.propTypes = {
	title: PropTypes.string,
	loading: PropTypes.bool,
	notFound: PropTypes.bool
};

export default connect( ( state ) => {
	const planId = getPlanId( state );
	const plan = getPlan( state, planId );
	return {
		title: get( plan, 'title', '' ),
		loading: ! plan,
		notFound: isPlanNotFound( state, planId )
	};
} )( PlanPageHeader );
