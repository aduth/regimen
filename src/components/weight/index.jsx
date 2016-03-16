/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { roundToNearestPlate, toKilograms } from 'lib/weight';
import { isProfileImperialUnit, getProfileMinPlate } from 'state/profile/selectors';

function Weight( { weight, isImperial, minPlate, className } ) {
	const classes = classNames( 'weight', className );
	const rounded = roundToNearestPlate( isImperial ? weight : toKilograms( weight ), minPlate );

	return (
		<span className={ classes }>
			<span className="weight__weight">
				{ rounded }
			</span>
			<span className="weight__unit">
				{ isImperial ? 'lbs' : 'kg' }
			</span>
		</span>
	);
}

Weight.propTypes = {
	weight: PropTypes.number,
	isImperial: PropTypes.bool,
	minPlate: PropTypes.number,
	className: PropTypes.string
};

export default connect( ( state ) => {
	return {
		isImperial: isProfileImperialUnit( state ),
		minPlate: getProfileMinPlate( state )
	};
} )( Weight );
