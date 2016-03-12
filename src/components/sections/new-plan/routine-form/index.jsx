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

import { removePlanFromProfile } from 'state/profile/actions';
import { createPlan } from 'state/plans/actions';
import { getPlan } from 'state/plans/selectors';
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

function RoutineForm( { routine, planId, plan, removePlanFromProfile, createPlan } ) {
	const classes = classNames( 'routine-form', {
		'is-loading': ! routine
	} );

	const block = (
		<Block
			title={ planId ? 'Update Plan' : 'Create New Plan' }
			padded
			className={ classes } />
	);

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
		if ( planId ) {
			removePlanFromProfile( planId );
		}

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
				{ planId ? 'Update' : 'Create' }
			</Button>
		</Form>
	) );
}

RoutineForm.propTypes = {
	routine: PropTypes.oneOf( Object.keys( routines ) ),
	planId: PropTypes.string,
	plan: PropTypes.object,
	createPlan: PropTypes.func.isRequired
};

export default connect(
	( state, ownProps ) => {
		return {
			plan: getPlan( state, ownProps.planId )
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			removePlanFromProfile,
			createPlan
		}, dispatch );
	}
)( RoutineForm );
