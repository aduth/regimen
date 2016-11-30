/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { values } from 'lodash';

/**
 * Internal dependencies
 */

import { SkillLevels } from 'routines/constants';

function SkillLabel( { skill } ) {
	let label;
	switch ( skill ) {
		case SkillLevels.BEGINNER:
			label = 'Beginner';
			break;

		case SkillLevels.INTERMEDIATE:
			label = 'Intermediate';
			break;

		case SkillLevels.ADVANCED:
			label = 'Advanced';
			break;

		default:
			label = 'Unknown';
	}

	return (
		<span className="skill-label">
			{ label }
		</span>
	);
}

SkillLabel.propTypes = {
	skill: PropTypes.oneOf( values( SkillLevels ) )
};

export default SkillLabel;
