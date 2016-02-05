/**
 * External dependencies
 */

import { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { requestPlan } from 'state/plans/actions';
import { isRequestingPlan } from 'state/plans/selectors';

class QueryPlan extends Component {
	static propTypes = {
		planId: PropTypes.string.isRequired
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

export default connect( ( state ) => {
	return {
		isRequestingPlan: isRequestingPlan( state )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		requestPlan
	}, dispatch );
} )( QueryPlan );
