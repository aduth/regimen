/**
 * External dependencies
 */

import { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
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

export default connect( ( state ) => {
	return {
		isRequestingProfile: isRequestingProfile( state )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		requestProfile
	}, dispatch );
} )( QueryProfile );
