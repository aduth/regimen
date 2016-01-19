/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { getProfile } from 'state/profile/selectors';
import Block from 'components/block';
import ProfilePlan from './plan';

function ProfilePlans( { profile } ) {
	const classes = classNames( 'profile-plans', {
		'is-loading': ! profile
	} );

	return (
		<Block title="Your Plans" className={ classes }>
			{ ( ! profile || ! profile.plans.length ) && (
				<div className="profile-plans__empty">
					You don't have any plans yet!
				</div>
			) }
			{ profile && profile.plans.map( ( plan ) => {
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
		profile: getProfile( state )
	};
} )( ProfilePlans );
