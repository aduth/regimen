/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { hasProfileLoaded, getProfilePlans } from 'state/profile/selectors';
import Block from 'components/block';
import ProfilePlan from './plan';

function ProfilePlans( { loaded, plans } ) {
	const classes = classNames( 'profile-plans', {
		'is-loading': ! loaded
	} );

	return (
		<Block title="Your Plans" className={ classes }>
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
	loaded: PropTypes.bool,
	plans: PropTypes.arrayOf( PropTypes.string )
};

export default connect( ( state ) => {
	return {
		loaded: hasProfileLoaded( state ),
		plans: getProfilePlans( state )
	};
} )( ProfilePlans );
