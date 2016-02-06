/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getPlan } from 'state/plans/selectors';
import { removePlanFromProfile } from 'state/profile/actions';
import { getProfilePlanProgress } from 'state/profile/selectors';
import QueryPlan from 'components/query-plan';
import Button from 'components/button';

function ProfilePlan( { planId, workout, plan, removePlanFromProfile } ) {
	return (
		<div className="profile-plans__plan">
			<QueryPlan planId={ planId } />
			<span className="profile-plans__plan-name">
				{ plan ? plan.title : '' }
			</span>
			<nav className="profile-plans__plan-actions">
				<Button success to={ `plan/${ planId }/workout/${ workout }` }>
					Resume
				</Button>
				<Button danger onClick={ () => removePlanFromProfile( planId ) }>
					Remove
				</Button>
			</nav>
		</div>
	);
}

ProfilePlan.propTypes = {
	planId: PropTypes.string.isRequired,
	plan: PropTypes.object
};

export default connect( ( state, ownProps ) => {
	return {
		plan: getPlan( state, ownProps.planId ),
		workout: getProfilePlanProgress( state, ownProps.planId )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		removePlanFromProfile
	}, dispatch );
} )( ProfilePlan );
