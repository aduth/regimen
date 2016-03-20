/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Form from 'react-jsonschema-form';
import { getDefaultFormState } from 'react-jsonschema-form/lib/utils';
import merge from 'lodash/merge';
import get from 'lodash/get';
import set from 'lodash/set';

/**
 * Internal dependencies
 */

import { removePlanFromProfile } from 'state/profile/actions';
import { isProfileImperialUnit } from 'state/profile/selectors';
import { toPounds, toKilograms } from 'lib/weight';
import { createPlan } from 'state/plans/actions';
import { getPlan } from 'state/plans/selectors';
import * as routines from 'routines';
import Block from 'components/block';
import Button from 'components/button';

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

function RoutineForm( { routine, planId, plan, imperial, removePlanFromProfile, createPlan, goBack } ) {
	const classes = classNames( 'routine-form', {
		'is-loading': ! routine
	} );

	const block = (
		<Block
			title={ planId ? 'Update Plan' : 'Create New Plan' }
			padded
			className={ classes } />
	);

	// Routine may be unknown while loading an edit form for an existing plan.
	// In these cases, display a placeholder until the plan has loaded.
	if ( ! routine ) {
		return React.cloneElement( block, null, (
			<div className="routine-form__placeholder" />
		) );
	}

	// Generate a form object containing the routine title, base form, and
	// routine-defined form schema
	const form = merge( {
		properties: {
			title: {
				default: routines[ routine ].name
			}
		}
	}, BASE_FORM, {
		properties: routines[ routine ].form.schema.properties
	} );

	// Routines can define their own UI schema. Merge with base UI schema.
	const uiSchema = {
		...BASE_UI_SCHEMA,
		...routines[ routine ].form.uiSchema
	};

	// Default form state should be derived from plan if editing existing. For
	// new plans, attempt to find default values in schema.
	let formState;
	if ( planId ) {
		formState = plan;
	} else {
		formState = getDefaultFormState( form );
	}

	/**
	 * Normalizes a form's units to conform to a standard imperial weight.
	 *
	 * @param  {Object}  formData  Form values
	 * @param  {Boolean} toDisplay Whether values are to be normalized for display
	 * @return {Object}            Normalized form values
	 */
	function normalizeFormDataUnit( formData, toDisplay ) {
		if ( ! imperial ) {
			formData = Object.assign( {}, formData );
			routines[ routine ].form.weights.forEach( ( path ) => {
				let weight = get( formData, path );
				weight = toDisplay ? toKilograms( weight ) : toPounds( weight );
				set( formData, path, Math.round( weight ) );
			} );
		}

		return formData;
	}

	/**
	 * Handles form submission, creating new plan with normalized form values
	 *
	 * @param {Object} form.formData Form values
	 */
	function onSubmit( { formData } ) {
		if ( planId ) {
			removePlanFromProfile( planId );
		}

		const plan = merge( {
			routine
		}, normalizeFormDataUnit( formData, false ) );

		createPlan( plan );
	}

	return React.cloneElement( block, null, (
		<Form
			schema={ form }
			formData={ normalizeFormDataUnit( formState, true ) }
			uiSchema={ uiSchema }
			onSubmit={ onSubmit }>
			<div className="routine-form__actions">
				<Button type="submit" success large>
					{ planId ? 'Update' : 'Create' }
				</Button>
				<Button large onClick={ () => goBack() }>
					Cancel
				</Button>
			</div>
		</Form>
	) );
}

RoutineForm.propTypes = {
	routine: PropTypes.oneOf( Object.keys( routines ) ),
	planId: PropTypes.string,
	plan: PropTypes.object,
	imperial: PropTypes.bool,
	removePlanFromProfile: PropTypes.func,
	createPlan: PropTypes.func,
	goBack: PropTypes.func
};

export default connect(
	( state, ownProps ) => ( {
		plan: getPlan( state, ownProps.planId ),
		imperial: isProfileImperialUnit( state )
	} ),
	{
		removePlanFromProfile,
		createPlan,
		goBack
	}
)( RoutineForm );
