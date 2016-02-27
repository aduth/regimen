/**
 * External dependencies
 */

var HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
	autoprefixer = require( 'autoprefixer' );

module.exports = {
	output: {
		path: __dirname + '/public',
		filename: 'dist/app-[hash].js',
		publicPath: '/'
	},
	resolve: {
		extensions: [ '', '.json', '.js', '.jsx' ],
		root: [
			__dirname + '/src'
		],
		alias: {
			'react-icons': 'react-icons/lib'
		}
	},
	module: {
		noParse: /lie\.js/
	},
	plugins: [
		new HtmlWebpackPlugin( {
			title: 'Regimen',
			templateContent: '' +
				'<!DOCTYPE html>' +
				( 'production' === process.env.NODE_ENV ?
					'<html manifest="/appcache/manifest.appcache">' :
					'<html>' ) +
				'<head>' +
				'	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">' +
				'	<meta name="description" content="Regimen helps with your workout progression planning. Supporting many popular routines, achieve your goals with a simple-to-use interface.">' +
				'	<meta name="theme-color" content="#63bdd4">' +
				'	<meta name="apple-mobile-web-app-capable" content="yes">' +
				'	<meta name="apple-mobile-web-app-title" content="Regimen">' +
				'	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">' +
				'	<title>Regimen</title>' +
				'	<link rel="dns-prefetch" href="https://regimenapp.cloudant.com">' +
				'	<link rel="manifest" href="/manifest.json">' +
				'	<link rel="icon" href="/favicon.ico" type="image/x-icon">' +
				'	<link rel="apple-touch-icon" href="/images/icon-48.png">' +
				'	<link rel="apple-touch-icon" sizes="96x96" href="/images/icon-96.png">' +
				'	<link rel="apple-touch-icon" sizes="192x192" href="/images/icon-192.png">' +
				'	{% for ( var css in o.htmlWebpackPlugin.files.css ) { %}' +
				'	<link rel="stylesheet" href="{%= o.htmlWebpackPlugin.files.css[ css ] %}">' +
				'	{% } %}' +
				'</head>' +
				'<body>' +
				'<div id="app"></div>' +
				'{% for ( var chunk in o.htmlWebpackPlugin.files.chunks ) { %}' +
				'<script src="{%= o.htmlWebpackPlugin.files.chunks[ chunk ].entry %}"></script>' +
				'{% } %}' +
				'<script>' +
				'( function() {' +
				'	var script;' +
				'	if ( \'touch-action\' in document.body.style ) {' +
				'		return;' +
				'	}' +
				'' +
				'	script = document.createElement( \'script\' );' +
				'	script.src = \'https://cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.js\';' +
				'	script.onload = function() {' +
				'		FastClick.attach( document.body );' +
				'	};' +
				'	document.body.appendChild( script );' +
				'} )();' +
				'</script>' +
				'</body>' +
				'</html>'
		} )
	],
	postcss: function() {
		return [ autoprefixer ];
	},
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};
