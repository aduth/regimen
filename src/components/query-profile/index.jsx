/**
 * External dependencies
 */

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { requestProfile } from 'state/profile/actions';
import { isRequestingProfile } from 'state/profile/selectors';

class QueryProfile extends Component {
	static propTypes ={
		isRequestingProfile: PropTypes.bool,
		requestProfile: PropTypes.func
	};

	static defaultProps = {
		requestProfile: () => {}
	};

	componentWillMount() {
		if ( ! this.props.isRequestingProfile ) {
			this.props.requestProfile();
		}
	}

	render() {
		return null;
	}
}

export default connect(
	( state ) => ( {
		isRequestingProfile: isRequestingProfile( state )
	} ),
	{ requestProfile }
)( QueryProfile );
