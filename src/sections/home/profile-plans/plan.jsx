/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { removePlanFromProfile } from 'state/profile/actions';
import { getProfilePlanProgress } from 'state/profile/selectors';
import PlanName from 'sections/home/plan-name';
import Button from 'components/button';
import Icon from 'components/icon';

function ProfilePlan( { planId, workout, removePlanFromProfile } ) {
	const planPath = `/plan/${ planId }/workout/${ workout }`;

	function confirmRemove() {
		if ( confirm( 'Are you sure you want to remove this plan?' ) ) {
			removePlanFromProfile( planId );
		}
	}

	return (
		<div className="profile-plans__plan">
			<Button plain to={ planPath } className="profile-plans__plan-name">
				<PlanName planId={ planId } />
			</Button>
			<nav className="profile-plans__plan-actions">
				<Button success to={ planPath }>
					<Icon icon="play">Resume</Icon>
				</Button>
				<Button danger onClick={ confirmRemove }>
					<Icon icon="trash">Remove</Icon>
				</Button>
			</nav>
		</div>
	);
}

ProfilePlan.propTypes = {
	planId: PropTypes.string.isRequired,
	workout: PropTypes.number,
	removePlanFromProfile: PropTypes.func
};

ProfilePlan.defaultProps = {
	removePlanFromProfile: () => {}
};

export default connect(
	( state, { planId } ) => ( {
		workout: getProfilePlanProgress( state, planId )
	} ),
	{ removePlanFromProfile }
)( ProfilePlan );
