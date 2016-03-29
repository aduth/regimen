/**
 * Appends polyfill script for browsers where touch-action style is not
 * supported. Specifically, this polyfills behavior for removing touch
 * delay on devices.
 */
export default function polyfill() {
	if ( 'touch-action' in document.body.style ) {
		return;
	}

	const script = document.createElement( 'script' );
	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.min.js';
	script.onload = function() {
		window.FastClick.attach( document.body );
	};

	document.body.appendChild( script );
}
