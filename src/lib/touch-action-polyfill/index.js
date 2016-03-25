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
