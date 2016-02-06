/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { removePlanFromProfile } from 'state/profile/actions';
import { getProfilePlanProgress } from 'state/profile/selectors';
import PlanName from 'components/plan-name';
import Button from 'components/button';

function ProfilePlan( { planId, workout, removePlanFromProfile } ) {
	return (
		<div className="profile-plans__plan">
			<span className="profile-plans__plan-name">
				<PlanName planId={ planId } />
			</span>
			<nav className="profile-plans__plan-actions">
				<Button success to={ `/plan/${ planId }/workout/${ workout }` }>
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
	planId: PropTypes.string.isRequired
};

export default connect( ( state, ownProps ) => {
	return {
		workout: getProfilePlanProgress( state, ownProps.planId )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		removePlanFromProfile
	}, dispatch );
} )( ProfilePlan );
