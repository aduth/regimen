/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
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

	setWorkoutRoute( event ) {
		const planId = this.refs.input.value;
		this.props.setWorkoutRoute( planId, 1 );
		event.preventDefault();
	}

	render() {
		return (
			<Block title="Add Plan by ID" className="add-via-id" padded>
				<p>If you have a URL to an existing plan, you can enter the plan ID below to add it to your profile. The plan ID is found in the URL path.</p>
				<form
					onSubmit={ this.setWorkoutRoute.bind( this ) }
					className="add-via-id__form">
					<input
						ref="input"
						initialValue=""
						placeholder="e.g. V1zPDOMvl"
						className="add-via-id__input" />
					<Button
						type="submit"
						className="add-via-id__submit">
						Add
					</Button>
				</form>
			</Block>
		);
	}
}

export default connect( null, ( dispatch ) => {
	return bindActionCreators( {
		setWorkoutRoute
	}, dispatch );
} )( AddViaId );
