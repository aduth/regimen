/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import values from 'lodash/values';

/**
 * Internal dependencies
 */

import Button from 'components/ui/button';
import FocusTypeLabel from 'components/ui/focus-type-label';
import ProgressionLabel from 'components/ui/progression-label';
import * as routines from 'routines';

export default class RoutineOption extends Component {
	static propTypes = {
		onSelect: PropTypes.func,
		routine: PropTypes.oneOf( values( routines ) )
	};

	static defaultProps = {
		onSelect: () => {}
	};

	constructor( props ) {
		super( props );

		this.state = {
			selected: false
		};
	}

	toggleSelected() {
		this.setState( {
			selected: ! this.state.selected
		} );
	}

	render() {
		const { name, description, focus, progression, weekdays } = this.props.routine;
		const classes = classNames( 'add-via-routine__option', {
			'is-selected': this.state.selected
		} );

		return (
			<div
				onClick={ this.toggleSelected.bind( this ) }
				className={ classes }>
				<div className="add-via-routine__option-overview">
					<h2 className="add-via-routine__option-name">
						{ name }
					</h2>
					<p className="add-via-routine__option-description">
						{ description }
					</p>
					{ this.state.selected && (
						<Button
							onClick={ this.props.onSelect }
							success
							className="add-via-routine__option-select">
							Choose This Routine
						</Button>
					) }
				</div>
				{ this.state.selected && (
					<table
						cellPadding="0"
						cellSpacing="0"
						className="add-via-routine__option-detail">
						<thead>
							<tr>
								<th>Focus</th>
								<th>Progression</th>
								<th>Workouts per Week</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><FocusTypeLabel focus={ focus } /></td>
								<td><ProgressionLabel progression={ progression } /></td>
								<td>{ weekdays.length }</td>
							</tr>
						</tbody>
					</table>
				) }
			</div>
		);
	}
}
