/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import Button from 'components/button';
import FocusTypeLabel from 'components/focus-type-label';
import SkillLabel from 'components/skill-label';
import * as routines from 'routines';

export default class RoutineOption extends Component {
	static propTypes = {
		onSelect: PropTypes.func,
		routine: PropTypes.oneOf( Object.keys( routines ) )
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

	toggleSelected( event ) {
		const { actions } = this.refs;
		if ( actions && actions.contains( event.target ) ) {
			return;
		}

		this.setState( {
			selected: ! this.state.selected
		} );
	}

	render() {
		const routine = routines[ this.props.routine ];
		const { name, author, description, focus, skill, weekdays } = routine;
		const classes = classNames( 'add-via-routine__option', {
			'is-selected': this.state.selected
		} );

		return (
			<div
				onClick={ this.toggleSelected.bind( this ) }
				className={ classes }>
				<div className="add-via-routine__option-overview">
					<header className="add-via-routine__option-name-author">
						<h2 className="add-via-routine__option-name">
							{ name }
						</h2>
						{ author && (
							<span className="add-via-routine__option-author">
								by { author }
							</span>
						) }
					</header>
					<p className="add-via-routine__option-description">
						{ description }
					</p>
					{ this.state.selected && (
						<div ref="actions" className="add-via-routine__actions">
							<Button
								to={ `/plan/new?routine=${ this.props.routine }` }
								success>
								Choose This Routine
							</Button>
							{ routine.external && (
								<Button
									to={ routine.external }
									target="_blank">
									More Information
								</Button>
							) }
						</div>
					) }
				</div>
				{ this.state.selected && (
					<table
						cellPadding="0"
						cellSpacing="0"
						className="add-via-routine__option-detail">
						<thead>
							<tr>
								<th>Skill Level</th>
								<th>Focus</th>
								<th>Workouts per Week</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><SkillLabel skill={ skill } /></td>
								<td><FocusTypeLabel focus={ focus } /></td>
								<td>{ weekdays.length }</td>
							</tr>
						</tbody>
					</table>
				) }
			</div>
		);
	}
}
