/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import partial from 'lodash/partial';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */

import { pushRoutePath } from 'state/routing/actions';

class Link extends Component {
	static propTypes = {
		to: PropTypes.string.isRequired,
		pushRoutePath: PropTypes.func,
		onClick: PropTypes.func
	};

	static defaultProps = {
		pushRoutePath: () => {},
		onClick: () => {}
	};

	onClick = ( event ) => {
		event.preventDefault();
		this.props.pushRoutePath();
		this.props.onClick();
	};

	render() {
		const props = omit( this.props, 'to', 'pushRoutePath' );
		return <a { ...props } onClick={ this.onClick } />;
	}
}

export default connect( null, ( dispatch, { to } ) => ( {
	pushRoutePath: partial( dispatch, pushRoutePath( to ) )
} ) )( Link );
