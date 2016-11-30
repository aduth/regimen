/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { get } from 'lodash';

/**
 * Internal dependencies
 */

import { getMatchedRoute } from 'state/routing/selectors';
import { getPlan } from 'state/plans/selectors';

function PlanPageHeader( { loading, title } ) {
	const classes = classNames( 'plan-page-header', {
		'is-loading': loading
	} );

	return (
		<span className={ classes }>
			{ loading ? 'Loading' : title }
		</span>
	);
}

PlanPageHeader.propTypes = {
	title: PropTypes.string,
	loading: PropTypes.bool
};

export default connect( ( state ) => {
	const route = getMatchedRoute( state );
	const { planId } = route.params;
	const plan = getPlan( state, planId );

	return {
		loading: ! plan,
		title: get( plan, 'title', '' )
	};
} )( PlanPageHeader );
