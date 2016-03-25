/**
 * External dependencies
 */

var webpack = require( 'webpack' ),
	HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
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
		noParse: /(lie\.js|buffertools)/
	},
	plugins: [
		new webpack.DefinePlugin( {
			'global.__DEV__': 'production' !== process.env.NODE_ENV,
			'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
			'process.env.COUCHDB_REMOTE_HOST': JSON.stringify(
				'COUCHDB_REMOTE_HOST' in process.env ? process.env.COUCHDB_REMOTE_HOST : 'https://regimenapp.cloudant.com'
			)
		} ),
		new HtmlWebpackPlugin( {
			title: 'Regimen',
			templateContent: '' +
				'<!DOCTYPE html>' +
				( 'production' === process.env.NODE_ENV ?
					'<html manifest="/appcache/manifest.appcache">' :
					'<html>' ) +
				'<head>' +
				'	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">' +
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
				'	<link rel="apple-touch-startup-image" href="/images/launch-1242.png"' +
				'		media="(device-width: 414px) and (device-height: 736px)' +
				'			and (-webkit-device-pixel-ratio: 3)' +
				'			and (orientation: landscape)">' +
				'	<link rel="apple-touch-startup-image" href="/images/launch-750.png"' +
				'		media="(device-width: 375px) and (device-height: 667px)' +
				'			and (-webkit-device-pixel-ratio: 2)">' +
				'	<link rel="apple-touch-startup-image" href="/images/launch-640.png"' +
				'		media="(device-width: 320px) and (device-height: 568px)' +
				'			and (-webkit-device-pixel-ratio: 2)">' +
				'	{% for ( var css in o.htmlWebpackPlugin.files.css ) { %}' +
				'	<link rel="stylesheet" href="{%= o.htmlWebpackPlugin.files.css[ css ] %}">' +
				'	{% } %}' +
				'</head>' +
				'<body>' +
				'<div id="app"></div>' +
				( process.env.GA_ACCOUNT_ID ?
					'<script>' +
					'(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){' +
					'(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),' +
					'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' +
					'})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');' +
					'ga(\'create\', \'' + process.env.GA_ACCOUNT_ID + '\', \'auto\');' +
					'</script>' :
					'' ) +
				'{% for ( var chunk in o.htmlWebpackPlugin.files.chunks ) { %}' +
				'<script src="{%= o.htmlWebpackPlugin.files.chunks[ chunk ].entry %}"></script>' +
				'{% } %}' +
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
