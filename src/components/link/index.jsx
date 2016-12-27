/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { partial, omit } from 'lodash';

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
		const { to } = this.props;
		const props = omit( this.props, 'to', 'pushRoutePath' );

		return <a { ...props } href={ to } onClick={ this.onClick } />;
	}
}

export default connect( null, ( dispatch, { to } ) => ( {
	pushRoutePath: partial( dispatch, pushRoutePath( to ) )
} ) )( Link );
