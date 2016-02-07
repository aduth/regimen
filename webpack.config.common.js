/**
 * External dependencies
 */
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	output: {
		path: __dirname + '/www',
		filename: 'app-[hash].js',
		publicPath: '/'
	},
	resolve: {
		extensions: [ '', '.json', '.js', '.jsx' ],
		root: [
			__dirname + '/src'
		]
	},
	module: {
		noParse: /lie\.js/
	},
	plugins: [
		new HtmlWebpackPlugin( {
			title: 'Regimen',
			templateContent: '' +
				'<!DOCTYPE html>' +
				'<html manifest="/appcache/manifest.appcache">' +
				'<head>' +
				'	<meta name="viewport" content="width=device-width">' +
				'	<meta name="theme-color" content="#63bdd4">' +
				'	<meta name="apple-mobile-web-app-capable" content="yes">' +
				'	<title>Regimen</title>' +
				'	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather:400,400italic,700,700italic|Open+Sans:400,400italic,700,700italic">' +
				'	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
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
				'</body>' +
				'</html>'
		} )
	],
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};
