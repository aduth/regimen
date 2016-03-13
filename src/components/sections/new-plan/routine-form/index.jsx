/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
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

function RoutineForm( { routine, planId, plan, isImperial, removePlanFromProfile, createPlan } ) {
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

	/**
	 * Normalizes a form's units to conform to a standard imperial weight.
	 *
	 * @param  {Object}  formData  Form values
	 * @param  {Boolean} toDisplay Whether values are to be normalized for display
	 * @return {Object}            Normalized form values
	 */
	function normalizeFormDataUnit( formData, toDisplay ) {
		if ( ! isImperial ) {
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
			formData={ normalizeFormDataUnit( plan, true ) }
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
	isImperial: PropTypes.bool,
	removePlanFromProfile: PropTypes.func,
	createPlan: PropTypes.func.isRequired
};

export default connect(
	( state, ownProps ) => {
		return {
			plan: getPlan( state, ownProps.planId ),
			isImperial: isProfileImperialUnit( state )
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			removePlanFromProfile,
			createPlan
		}, dispatch );
	}
)( RoutineForm );
