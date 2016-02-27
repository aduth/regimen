/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import map from 'lodash/map';

/**
 * Internal dependencies
 */

import { setPath } from 'state/routing/actions';
import RoutineOption from './routine-option';
import * as routines from 'routines';

function RoutineOptions( { setPath } ) {
	return (
		<ul className="add-via-routine__options">
			{ map( routines, ( routine, key ) => {
				return (
					<li key={ key } className="add-via-routine__options-item">
						<RoutineOption
							routine={ routine }
							onSelect={ () => setPath( `/plan/new?routine=${ key }` ) } />
					</li>
				);
			} ) }
		</ul>
	);
}

RoutineOptions.propTypes = {
	setPath: PropTypes.func
};

RoutineOptions.defaultProps = {
	setPath: () => {}
};

export default connect( null, ( dispatch ) => {
	return bindActionCreators( {
		setPath
	}, dispatch );
} )( RoutineOptions );
