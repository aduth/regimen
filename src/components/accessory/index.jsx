/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getMatchedRoute } from 'state/routing/selectors';
import { getPlanRoutine } from 'state/plans/selectors';

function Accessory( { routine, workout } ) {
	if ( ! routine || ! routine.accessory ) {
		return null;
	}

	const exercises = routine.accessory( workout );
	if ( ! exercises.length ) {
		return null;
	}

	return (
		<section className="accessory">
			<header>
				<h2 className="accessory__heading">
					Recommended Accessory Work
				</h2>
			</header>
			<ul className="accessory__exercises">
				{ exercises.map( ( exercise, i ) => {
					return (
						<li key={ i }>
							{ exercise }
						</li>
					);
				} ) }
			</ul>
		</section>
	);
}

Accessory.propTypes = {
	routine: PropTypes.object,
	workout: PropTypes.number
};

export default connect( ( state ) => {
	const route = getMatchedRoute( state );
	const { planId, workout } = route.params;

	return {
		routine: getPlanRoutine( state, planId ),
		workout: parseInt( workout, 10 )
	};
} )( Accessory );
