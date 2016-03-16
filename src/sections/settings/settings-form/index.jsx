/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';

/**
 * Internal dependencies
 */

import Block from 'components/block';
import { updateProfile } from 'state/profile/actions';
import { isProfileImperialUnit, getProfileMinPlate } from 'state/profile/selectors';

function SettingsForm( { isImperial, minPlate, updateProfile } ) {
	const schema = {
		title: 'Settings',
		type: 'object',
		properties: {
			unit: {
				title: 'Unit',
				type: 'string',
				enum: [ 'Pounds', 'Kilograms' ]
			},
			minPlate: {
				title: 'Minimum plate weight',
				type: 'number',
				multipleOf: 0.25
			}
		}
	};

	const uiSchema = {
		unit: {
			'ui:widget': 'radio'
		}
	};

	const formData = {
		unit: isImperial ? 'Pounds' : 'Kilograms',
		minPlate
	};

	function onSubmit( { formData } ) {
		updateProfile( {
			imperial: 'Pounds' === formData.unit,
			minPlate: formData.minPlate
		} );
	}

	return (
		<Block title="Profile Settings" padded>
			<Form
				schema={ schema }
				uiSchema={ uiSchema }
				formData={ formData }
				onSubmit={ onSubmit } />
		</Block>
	);
}

SettingsForm.propTypes = {
	isImperial: PropTypes.bool,
	updateProfile: PropTypes.func
};

export default connect(
	( state ) => {
		return {
			isImperial: isProfileImperialUnit( state ),
			minPlate: getProfileMinPlate( state )
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			updateProfile
		}, dispatch );
	}
)( SettingsForm );
