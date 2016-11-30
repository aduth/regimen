/**
 * External dependencies
 */

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { requestPlan } from 'state/plans/actions';
import { isRequestingPlan } from 'state/plans/selectors';

class QueryPlan extends Component {
	static propTypes = {
		planId: PropTypes.string.isRequired,
		isRequestingPlan: PropTypes.bool,
		requestPlan: PropTypes.func
	};

	static defaultProps = {
		requestPlan: () => {}
	};

	componentWillMount() {
		if ( this.props.isRequestingPlan ) {
			return;
		}

		this.props.requestPlan( this.props.planId );
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isRequestingPlan ||
				( this.props.planId === nextProps.planId ) ) {
			return;
		}

		nextProps.requestPlan( nextProps.planId );
	}

	render() {
		return null;
	}
}

export default connect(
	( state ) => ( {
		isRequestingPlan: isRequestingPlan( state )
	} ),
	{ requestPlan }
)( QueryPlan );
