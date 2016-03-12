/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
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

function RoutineForm( { routine, plan, createPlan } ) {
	const classes = classNames( 'routine-form', {
		'is-loading': ! routine
	} );

	const block = <Block title="Create New Plan" padded className={ classes } />;
	if ( ! routine ) {
		return React.cloneElement( block, null, (
			<div className="routine-form__placeholder" />
		) );
	}

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

	return React.cloneElement( block, null, (
		<Form
			schema={ form }
			formData={ plan }
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
	) );
}

RoutineForm.propTypes = {
	routine: PropTypes.oneOf( Object.keys( routines ) ),
	plan: PropTypes.object,
	createPlan: PropTypes.func.isRequired
};

export default connect( null, ( dispatch ) => {
	return bindActionCreators( {
		createPlan
	}, dispatch );
} )( RoutineForm );
