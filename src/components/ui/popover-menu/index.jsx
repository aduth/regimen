/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class PopoverMenu extends Component {
	static propTypes = {
		position: PropTypes.oneOf( [
			'top left',
			'top right',
			'bottom left',
			'bottom right'
		] ),
		visible: PropTypes.bool,
		className: PropTypes.string,
		onClose: PropTypes.func,
		children: PropTypes.node
	};

	static defaultProps = {
		position: 'bottom right',
		visible: false,
		onClose: () => {}
	};

	componentDidMount() {
		this.boundCloseOnClickOutside = this.closeOnClickOutside.bind( this );

		if ( this.props.visible ) {
			window.addEventListener( 'click', this.boundCloseOnClickOutside );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.visible && ! this.props.visible ) {
			// [TODO]: Defer until next call stack to ensure that not immediately invoked by activating click?
			// Else maybe preventDefault in the click handler that makes PopoverMenu visible
			window.addEventListener( 'click', this.boundCloseOnClickOutside );
		} else if ( ! nextProps.visible && this.props.visible ) {
			window.removeEventListener( 'click', this.boundCloseOnClickOutside );
		}
	}

	componentWillUnmount() {
		window.removeEventListener( 'click', this.boundCloseOnClickOutside );
		delete this.boundCloseOnClickOutside;
	}

	closeOnClickOutside( event ) {
		if ( ! this.refs.popover.contains( event.target ) ) {
			this.props.onClose();
		}
	}

	render() {
		const { position, visible, className, children } = this.props;
		const classes = classNames( 'popover-menu', className, {
			'is-top-left': 'top left' === position,
			'is-top-right': 'top right' === position,
			'is-bottom-left': 'bottom left' === position,
			'is-bottom-right': 'bottom right' === position,
			'is-visible': visible
		} );

		return (
			<nav ref="popover" className={ classes }>
				<ul className="popover-menu__list">
					{ children }
				</ul>
			</nav>
		);
	}
}
