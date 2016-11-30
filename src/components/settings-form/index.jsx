/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';

/**
 * Internal dependencies
 */

import Block from 'components/block';
import Button from 'components/button';
import { updateProfile } from 'state/profile/actions';
import { isProfileImperialUnit, getProfileMinPlate } from 'state/profile/selectors';

class SettingsForm extends Component {
	static propTypes = {
		imperial: PropTypes.bool,
		minPlate: PropTypes.number,
		updateProfile: PropTypes.func
	};

	/**
	 * Settings form submission handler, updating profile
	 *
	 * @param {Object} form.formData Form values
	 */
	submit = ( { formData } ) => {
		this.props.updateProfile( {
			imperial: 'Pounds' === formData.unit,
			minPlate: formData.minPlate
		}, true );

		window.history.back();
	};

	cancel() {
		window.history.back();
	}

	render() {
		const { imperial, minPlate } = this.props;
		const schema = {
			title: 'Settings',
			type: 'object',
			properties: {
				unit: {
					title: 'Unit',
					type: 'string',
					'enum': [ 'Pounds', 'Kilograms' ]
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
			unit: imperial ? 'Pounds' : 'Kilograms',
			minPlate
		};

		return (
			<Block title="Profile Settings" padded className="settings-form">
				<Form
					schema={ schema }
					uiSchema={ uiSchema }
					formData={ formData }
					onSubmit={ this.submit }>
					<div className="settings-form__actions">
						<Button type="submit" success large>
							Submit
						</Button>
						<Button large onClick={ this.cancel }>
							Cancel
						</Button>
					</div>
				</Form>
			</Block>
		);
	}
}

export default connect(
	( state ) => ( {
		imperial: isProfileImperialUnit( state ),
		minPlate: getProfileMinPlate( state )
	} ),
	{ updateProfile }
)( SettingsForm );
