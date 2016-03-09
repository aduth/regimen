/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import merge from 'lodash/merge';

/**
 * Internal dependencies
 */

import { createPlan } from 'state/plans/actions';
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

const BASE_UI_SCHEMA = {
	classNames: 'routine-form__form'
};

function RoutineForm( { routine, createPlan } ) {
	const form = merge( {
		properties: {
			title: {
				default: routines[ routine ].name
			}
		}
	}, BASE_FORM, {
		properties: routines[ routine ].form.schema.properties
	} );

	const uiSchema = {
		...BASE_UI_SCHEMA,
		...routines[ routine ].form.uiSchema
	};

	function onSubmit( form ) {
		createPlan( merge( { routine }, form.formData ) );
	}

	return (
		<Block title="Create New Plan" padded>
			<Form
				schema={ form }
				uiSchema={ uiSchema }
				onSubmit={ onSubmit }>
				<Button
					type="submit"
					success
					large
					className="routine-form__submit">
					Create
				</Button>
			</Form>
		</Block>
	);
}

RoutineForm.propTypes = {
	routine: PropTypes.oneOf( Object.keys( routines ) ).isRequired
};

export default connect( null, ( dispatch ) => {
	return bindActionCreators( {
		createPlan
	}, dispatch );
} )( RoutineForm );
