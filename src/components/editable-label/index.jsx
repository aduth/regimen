/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class EditableLabel extends Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func
	};

	static defaultProps = {
		onChange: () => {}
	};

	constructor( props ) {
		super( props );

		this.boundSubmit = this.submit.bind( this );
		this.state = {
			isEditing: false
		};
	}

	componentWillUnmount() {
		this.toggleWindowClickListener( false );
	}

	toggleWindowClickListener( active ) {
		if ( global.window ) {
			const handler = ( active ? 'add' : 'remove' ) + 'EventListener';
			global.window[ handler ]( 'click', this.boundSubmit );
		}
	}

	toggleEditing( active, event ) {
		if ( ! active ) {
			this.refs.input.blur();
		}

		this.toggleWindowClickListener( active );
		this.setState( { isEditing: active }, () => {
			if ( active ) {
				this.refs.input.select();
				this.refs.input.focus();
			}
		} );

		if ( event ) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	submit( event ) {
		if ( this.refs.input.value !== this.props.value ) {
			this.props.onChange( this.refs.input.value );
		}

		this.toggleEditing( false, event );
	}

	render() {
		const classes = classNames( 'editable-label', {
			'is-editing': this.state.isEditing
		} );

		if ( this.state.isEditing ) {
			return (
				<form
					onSubmit={ this.submit.bind( this ) }
					onClick={ ( event ) => event.stopPropagation() }
					className={ classes }>
					<input
						ref="input"
						type="text"
						defaultValue={ this.props.value }
						className="editable-label__input" />
				</form>
			);
		}

		return (
			<span
				onClick={ this.toggleEditing.bind( this, true ) }
				className={ classes }>
				{ this.props.value }
			</span>
		);
	}
}
