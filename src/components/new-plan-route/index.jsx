/**
 * External dependencies
 */

import React, { Component } from 'react';

/**
 * Internal dependencies
 */

import Page from 'components/page';
import Content from 'components/content';
import AddViaId from 'components/add-via-id';

export default class NewPlanRoute extends Component {
	render() {
		return (
			<Page title="Create Plan">
				<Content>
					<AddViaId />
				</Content>
			</Page>
		);
	}
}
