/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Page from 'components/page';
import Content from 'components/content';
import ProfilePlans from 'components/profile-plans';
import AddPlanButton from 'components/add-plan-button';

export default function HomeRoute() {
	return (
		<Page title="Home">
			<Content>
				<ProfilePlans />
				<AddPlanButton />
			</Content>
		</Page>
	);
}
