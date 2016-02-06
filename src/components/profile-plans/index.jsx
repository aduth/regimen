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
import QueryProfile from 'components/query-profile';
import ProfilePlan from './plan';

function ProfilePlans( { requesting, plans } ) {
	const classes = classNames( 'profile-plans', {
		'is-loading': requesting
	} );

	return (
		<Block title="Your Plans" className={ classes }>
			<QueryProfile />
			{ ( ! plans.length ) && (
				<div className="profile-plans__empty">
					You don't have any plans yet!
				</div>
			) }
			{ plans.map( ( plan ) => {
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
	requesting: PropTypes.bool,
	plans: PropTypes.arrayOf( PropTypes.string )
};

export default connect( ( state ) => {
	return {
		requesting: isRequestingProfile( state ),
		plans: getProfilePlans( state )
	};
} )( ProfilePlans );
