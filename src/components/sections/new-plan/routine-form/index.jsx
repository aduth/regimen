/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import Form from 'react-jsonschema-form';
import merge from 'lodash/merge';

/**
 * Internal dependencies
 */

import * as routines from 'routines';
import Block from 'components/ui/block';
import Button from 'components/ui/button';

/**
 * Constants
 */

const BASE_FORM = {
	title: 'Plan',
	type: 'object',
	properties: {
		title: {
			title: 'Title',
			description: 'Give your plan a unique name to distinguish it from others',
			type: 'string'
		}
	}
};

function RoutineForm( { routine } ) {
	const form = merge( {
		properties: {
			title: {
				default: routines[ routine ].name
			}
		}
	}, BASE_FORM, {
		properties: routines[ routine ].form.properties
	} );

	return (
		<Block title="Create New Plan" padded>
			<Form schema={ form }>
				<Button type="submit" success>
					Create
				</Button>
			</Form>
		</Block>
	);
}

RoutineForm.propTypes = {
	routine: PropTypes.oneOf( Object.keys( routines ) ).isRequired
};

export default RoutineForm;
