/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Page from 'layout/page';
import Content from 'layout/content';
import Block from 'components/block';

export default function PrivacyRoute() {
	return (
		<Page title="About">
			<Content>
				<Block title="About" padded>
					<p>
						Regimen helps you plan the progression of your workouts. Choose from a
						number of popular weightlifting routines to generate a customized plan to
						help you achieve your goals.
					</p>
					<p>
						Regimen is neither affiliated with or endorsed by any of the routines
						offered for automated plan generation. We seek to be as transparent and
						appreciative as possible in attributing to the original authors. Copyright
						concerns should be directed to the contact email listed below.
					</p>
					<p>
						For comments, concerns, or other inquiries, direct emails to{ ' ' }
						<a href="mailto:info@regimenapp.com">info@regimenapp.com</a>.
					</p>
				</Block>
			</Content>
		</Page>
	);
}
