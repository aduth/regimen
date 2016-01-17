/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Block( { title, padded, children } ) {
	const classes = classNames( 'block', {
		'is-padded': padded
	} );

	return (
		<section className={ classes }>
			<header className="block__header">
				{ title }
			</header>
			<div className="block__content">
				{ children }
			</div>
		</section>
	);
}

Block.propTypes = {
	title: PropTypes.node,
	padded: PropTypes.bool,
	children: PropTypes.node
};

export default Block;
