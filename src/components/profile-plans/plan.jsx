/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { removePlanFromProfile } from 'state/profile/actions';
import { getProfilePlanProgress } from 'state/profile/selectors';
import PlanName from 'components/plan-name';
import Button from 'components/button';
import Icon from 'components/icon';

class ProfilePlan extends Component {
	static propTypes = {
		planId: PropTypes.string.isRequired,
		workout: PropTypes.number,
		removePlanFromProfile: PropTypes.func
	};

	static defaultProps = {
		removePlanFromProfile: () => {}
	};

	confirmRemove = () => {
		if ( confirm( 'Are you sure you want to remove this plan?' ) ) {
			this.props.removePlanFromProfile( this.props.planId );
		}
	};

	render() {
		const { planId, workout } = this.props;
		const planPath = `/plan/${ planId }/workout/${ workout }`;

		return (
			<div className="profile-plans__plan">
				<Button plain to={ planPath } className="profile-plans__plan-name">
					<PlanName planId={ planId } />
				</Button>
				<nav className="profile-plans__plan-actions">
					<Button success to={ planPath }>
						<Icon icon="play">Resume</Icon>
					</Button>
					<Button danger onClick={ this.confirmRemove }>
						<Icon icon="trash">Remove</Icon>
					</Button>
				</nav>
			</div>
		);
	}
}

export default connect(
	( state, { planId } ) => ( {
		workout: getProfilePlanProgress( state, planId )
	} ),
	{ removePlanFromProfile }
)( ProfilePlan );
