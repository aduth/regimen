/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Form from 'react-jsonschema-form';

/**
 * Internal dependencies
 */

import Block from 'components/block';
import Button from 'components/button';
import { updateProfile } from 'state/profile/actions';
import { isProfileImperialUnit, getProfileMinPlate } from 'state/profile/selectors';

function SettingsForm( { isImperial, minPlate, updateProfile, goBack } ) {
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
		classNames: 'settings-form__form',
		unit: {
			'ui:widget': 'radio'
		}
	};

	const formData = {
		unit: isImperial ? 'Pounds' : 'Kilograms',
		minPlate
	};

	/**
	 * Settings form submission handler, updating profile
	 *
	 * @param {Object} form.formData Form values
	 */
	function onSubmit( { formData } ) { // eslint-disable-line react/prop-types
		updateProfile( {
			imperial: 'Pounds' === formData.unit,
			minPlate: formData.minPlate
		}, true );

		goBack();
	}

	return (
		<Block title="Profile Settings" padded className="settings-form">
			<Form
				schema={ schema }
				uiSchema={ uiSchema }
				formData={ formData }
				onSubmit={ onSubmit }>
				<Button
					type="submit"
					success
					large
					className="settings-form__submit">
					Submit
				</Button>
			</Form>
		</Block>
	);
}

SettingsForm.propTypes = {
	isImperial: PropTypes.bool,
	minPlate: PropTypes.number,
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
			updateProfile,
			goBack
		}, dispatch );
	}
)( SettingsForm );
