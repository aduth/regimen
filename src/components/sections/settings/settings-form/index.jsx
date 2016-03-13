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

import Block from 'components/ui/block';
import { updateProfile } from 'state/profile/actions';
import { isProfileImperialUnit } from 'state/profile/selectors';

function SettingsForm( { isImperial, updateProfile } ) {
	const schema = {
		title: 'Settings',
		type: 'object',
		properties: {
			unit: {
				title: 'Unit',
				type: 'string',
				enum: [ 'Pounds', 'Kilograms' ],
				default: isImperial ? 'Pounds' : 'Kilograms'
			}
		}
	};

	const uiSchema = {
		unit: {
			'ui:widget': 'radio'
		}
	};

	function onSubmit( { formData } ) {
		updateProfile( {
			imperial: 'Pounds' === formData.unit
		} );
	}

	return (
		<Block title="Profile Settings" padded>
			<Form
				schema={ schema }
				uiSchema={ uiSchema }
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
			isImperial: isProfileImperialUnit( state )
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			updateProfile
		}, dispatch );
	}
)( SettingsForm );
