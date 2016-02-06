/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/object/get';

/**
 * Internal dependencies
 */

import { editPlan } from 'state/plans/actions';
import { getPlanId } from 'state/ui/selectors';
import { getPlan, isPlanNotFound } from 'state/plans/selectors';
import EditableLabel from 'components/editable-label';

function PlanPageHeader( { planId, title, editPlan, loading, notFound } ) {
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
			<EditableLabel
				value={ title }
				onChange={ ( value ) => {
					editPlan( planId, { title: value } )
				} } />
		</span>
	);
}

PlanPageHeader.propTypes = {
	planId: PropTypes.string,
	title: PropTypes.string,
	editPlan: PropTypes.func,
	loading: PropTypes.bool,
	notFound: PropTypes.bool
};

PlanPageHeader.defaultProps = {
	editPlan: () => {}
};

export default connect( ( state ) => {
	const planId = getPlanId( state );
	const plan = getPlan( state, planId );
	return {
		planId,
		title: get( plan, 'title', '' ),
		loading: ! plan,
		notFound: isPlanNotFound( state, planId )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		editPlan
	}, dispatch );
} )( PlanPageHeader );
