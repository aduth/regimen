/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Button from 'components/ui/button';

export default function NotFoundWarning() {
	return (
		<section className="not-found-warning">
			<header>
				<h1 className="not-found-warning__heading">
					Page Not Found
				</h1>
				<hr className="not-found-warning__divider" />
			</header>
			<p>Sorry, but the page you were trying to find does not exist.</p>
			<p>
				<Button to="/" large success className="not-found-warning__return-home">
					Return Home
				</Button>
			</p>
		</section>
	);
}
