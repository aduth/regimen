/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Page from 'components/layout/page';
import Content from 'components/layout/content';
import ProfilePlans from 'components/sections/home/profile-plans';
import AddPlanButton from 'components/sections/home/add-plan-button';

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
