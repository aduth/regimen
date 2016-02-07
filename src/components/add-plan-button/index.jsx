/**
 * External dependencies
 */

import React from 'react';
import { Link } from 'react-router';

/**
 * Internal dependencies
 */

import Icon from 'components/icon';

function AddPlanButton() {
	return (
		<div className="add-plan-button">
			<Link to="/plan/new" className="add-plan-button__link">
				<span className="add-plan-button__circle">
					<Icon icon="plus" />
				</span>
				<span className="add-plan-button__label">
					Add Plan
				</span>
			</Link>
		</div>
	);
}

export default AddPlanButton;
