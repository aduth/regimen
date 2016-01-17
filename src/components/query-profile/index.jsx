/**
 * External dependencies
 */

import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { requestProfile } from 'state/profile/actions';
import { getProfile, isRequestingProfile } from 'state/profile/selectors';

class QueryProfile extends Component {
	componentDidMount() {
		this.ensureHasProfile();
	}

	componentDidUpdate() {
		this.ensureHasProfile();
	}

	ensureHasProfile() {
		if ( ! this.props.profile && ! this.props.isRequestingProfile ) {
			this.props.requestProfile();
		}
	}

	render() {
		return null;
	}
}

export default connect( ( state ) => {
	return {
		profile: getProfile( state ),
		isRequestingProfile: isRequestingProfile( state )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		requestProfile
	}, dispatch );
} )( QueryProfile );
