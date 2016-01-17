/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getProfile } from 'state/profile/selectors';
import Block from 'components/block';
import ProfilePlan from './plan';

function ProfilePlans( { plans } ) {
	return (
		<Block title="Your Plans" className="profile-plans">
			{ ! plans && (
				<div className="profile-plans__empty">
					You don't have any plans yet!
				</div>
			) }
			{ plans && plans.map( ( plan ) => {
				return (
					<ProfilePlan
						key={ plan }
						planId={ plan } />
				);
			} ) }
		</Block>
	);
}

ProfilePlans.propTypes = {
	plans: PropTypes.array
};

export default connect( ( state ) => {
	const profile = getProfile( state );
	return {
		plans: profile ? profile.plans : null
	};
} )( ProfilePlans );
