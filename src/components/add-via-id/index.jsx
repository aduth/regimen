/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { setWorkoutRoute } from 'state/routing/actions';
import Block from 'components/block';
import Button from 'components/button';

class AddViaId extends Component {
	static propTypes = {
		setWorkoutRoute: PropTypes.func
	};

	static defaultProps = {
		setWorkoutRoute: () => {}
	};

	constructor( props ) {
		super( props );

		this.state = {
			isSubmitDisabled: true
		};
	}

	setWorkoutRoute = ( event ) => {
		const planId = this.refs.input.value;
		this.props.setWorkoutRoute( planId, 1 );
		event.preventDefault();
	};

	toggleSubmitDisabled = ( event ) => {
		this.setState( {
			isSubmitDisabled: ! event.target.value.length
		} );
	};

	render() {
		return (
			<Block title="Add Plan by ID" className="add-via-id" padded>
				<p>
					If you have a URL to an existing plan, you can enter the plan ID below to add it to your profile.
					The plan ID is found in the URL path.
				</p>
				<form
					onSubmit={ this.setWorkoutRoute }
					className="add-via-id__form">
					<input
						ref="input"
						defaultValue=""
						onChange={ this.toggleSubmitDisabled }
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
						placeholder="e.g. V1zPDOMvl"
						className="add-via-id__input" />
					<Button
						type="submit"
						disabled={ this.state.isSubmitDisabled }
						className="add-via-id__submit">
						Add
					</Button>
				</form>
			</Block>
		);
	}
}

export default connect( null, { setWorkoutRoute } )( AddViaId );
