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
				'<html>' +
				'<head>' +
				'	<meta name="viewport" content="width=device-width">' +
				'	<title>Regimen</title>' +
				'	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather:400,400italic,700,700italic|Open+Sans:400,400italic,700,700italic">' +
				'	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
				'	<link rel="dns-prefetch" href="https://regimenapp.cloudant.com">' +
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
