/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Internal dependencies
 */

import { updateProfile } from 'state/profile/actions';
import { hasProfileLoaded, isWelcomeHidden } from 'state/profile/selectors';
import Button from 'components/button';
import Icon from 'components/icon';

function Welcome( { visible, hide } ) {
	return (
		<ReactCSSTransitionGroup
			transitionName="welcome"
			transitionEnterTimeout={ 120 }
			transitionLeaveTimeout={ 120 }>
			{ visible && (
				<section className="welcome__content">
					<header>
						<h1 className="welcome__heading">
							Welcome to Regimen!
						</h1>
						<Button
							plain
							onClick={ hide }
							className="welcome__dismiss">
							<Icon icon="close">Dismiss</Icon>
						</Button>
					</header>
					<p className="welcome__body">
						Regimen helps you plan the progression of your workouts. Choose
						from a number of popular weightlifting routines to generate a
						customized plan to help you achieve your goals. To begin, add
						your first plan and choose the routine that appeals to your
						area of focus.
					</p>
				</section>
			) }
		</ReactCSSTransitionGroup>
	);
}

Welcome.propTypes = {
	visible: PropTypes.bool,
	hide: PropTypes.func
};

export default connect(
	( state ) => ( {
		visible: hasProfileLoaded( state ) && ! isWelcomeHidden( state )
	} ),
	{ hide: updateProfile.bind( null, { hideWelcome: true } ) }
)( Welcome );
