/**
 * External dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

import Page from 'components/layout/page';
import Content from 'components/layout/content';
import RoutineForm from './routine-form';
import NewPlanSelection from './new-plan-selection';

function NewPlanRoute( { location } ) {
	return (
		<Page title="Create Plan">
			<Content>
				{ location.query.routine ?
					<RoutineForm /> :
					<NewPlanSelection /> }
			</Content>
		</Page>
	);
}

NewPlanRoute.propTypes = {
	location: PropTypes.object
};

export default NewPlanRoute;
