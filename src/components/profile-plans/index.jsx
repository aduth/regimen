/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { isRequestingProfile, getProfilePlans } from 'state/profile/selectors';
import Block from 'components/block';
import ProfilePlan from './plan';

function ProfilePlans( { requestingProfile, profilePlans } ) {
	const classes = classNames( 'profile-plans', {
		'is-loading': requestingProfile
	} );

	return (
		<Block title="Your Plans" className={ classes }>
			{ ( ! profilePlans.length ) && (
				<div className="profile-plans__empty">
					You don't have any plans yet!
				</div>
			) }
			{ profilePlans.map( ( plan ) => {
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
	profile: PropTypes.object
};

export default connect( ( state ) => {
	return {
		requestingProfile: isRequestingProfile( state ),
		profilePlans: getProfilePlans( state )
	};
} )( ProfilePlans );
