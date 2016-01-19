/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Block( { title, className, padded, children } ) {
	const classes = classNames( 'block', className, {
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
	className: PropTypes.string,
	padded: PropTypes.bool,
	children: PropTypes.node
};

export default Block;
