/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Page from 'components/page';
import Content from 'components/content';
import SettingsForm from './settings-form';

export default function SettingsRoute() {
	return (
		<Page title="Settings">
			<Content>
				<SettingsForm />
			</Content>
		</Page>
	);
}
