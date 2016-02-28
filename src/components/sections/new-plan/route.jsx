/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Page from 'components/layout/page';
import Content from 'components/layout/content';
import NewPlanSelection from './new-plan-selection';

export default function NewPlanRoute() {
	return (
		<Page title="Create Plan">
			<Content>
				<NewPlanSelection />
			</Content>
		</Page>
	);
}
