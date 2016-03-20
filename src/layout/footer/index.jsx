/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import Button from 'components/button';

export default function Footer() {
	return (
		<nav className="footer">
			<ul className="footer__links">
				<li className="footer__link">
					<Button plain to="/about">
						About
					</Button>
				</li>
				<li className="footer__link">
					<Button plain to="/privacy">
						Privacy
					</Button>
				</li>
				<li className="footer__link">
					<Button plain to="https://github.com/aduth/regimen/issues/new">
						Help
					</Button>
				</li>
			</ul>
		</nav>
	);
}
