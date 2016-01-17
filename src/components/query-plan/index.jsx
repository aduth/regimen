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
import { getPlan, isRequestingPlan } from 'state/plans/selectors';

class QueryPlan extends Component {
	static propTypes = {
		planId: PropTypes.string.isRequired
	};

	componentDidMount() {
		this.ensureHasPlan();
	}

	componentDidUpdate() {
		this.ensureHasPlan();
	}

	ensureHasPlan() {
		if ( ! this.props.plan && ! this.props.isRequestingPlan ) {
			this.props.requestPlan( this.props.planId );
		}
	}

	render() {
		return null;
	}
}

export default connect( ( state ) => {
	return {
		plan: getPlan( state ),
		isRequestingPlan: isRequestingPlan( state )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		requestPlan
	}, dispatch );
} )( QueryPlan );
