/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Page from 'layout/page';
import Content from 'layout/content';
import ProfilePlans from './profile-plans';
import AddPlanButton from './add-plan-button';

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