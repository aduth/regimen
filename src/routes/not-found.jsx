/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Page from 'components/page';
import Content from 'components/content';
import NotFoundWarning from 'components/not-found-warning';

export default function NotFoundRoute() {
	return (
		<Page title="Page Not Found">
			<Content>
				<NotFoundWarning />
			</Content>
		</Page>
	);
}
