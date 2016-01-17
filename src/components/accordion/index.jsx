/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import Icon from 'components/icon';
import { isAccordionExpanded } from 'state/ui/accordions/selectors';
import { toggleAccordion } from 'state/ui/accordions/actions';

function Accordion( { id, expanded, onToggle, title, children } ) {
	const classes = classNames( 'accordion', {
		'is-expanded': expanded
	} );

	return (
		<section className={ classes }>
			<header className="accordion__header">
				<button type="button" className="accordion__header-button" onClick={ onToggle }>
					{ title }
					<Icon icon="caret-down" />
				</button>
			</header>
			<div className="accordion__content">
				{ children }
			</div>
		</section>
	);
}

Accordion.propTypes = {
	expanded: PropTypes.bool,
	onToggle: PropTypes.func,
	title: PropTypes.node,
	children: PropTypes.node
};

Accordion.defaultProps = {
	expanded: false,
	onToggle: () => {}
};

export default connect( ( state, ownProps ) => {
	if ( ! ownProps.id ) {
		return {};
	}

	return {
		expanded: isAccordionExpanded( state, ownProps.id )
	};
}, ( dispatch, ownProps ) => {
	if ( ! ownProps.id ) {
		return {};
	}

	return bindActionCreators( {
		onToggle: toggleAccordion.bind( null, ownProps.id )
	}, dispatch );
} )( Accordion );
