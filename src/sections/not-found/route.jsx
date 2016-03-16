/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Page from 'layout/page';
import Content from 'layout/content';
import NotFoundWarning from './not-found-warning';

export default function NotFoundRoute() {
	return (
		<Page title="Page Not Found">
			<Content>
				<NotFoundWarning />
			</Content>
		</Page>
	);
}
