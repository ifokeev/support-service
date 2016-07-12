import webpack from 'webpack';
import merge from 'webpack-merge';

import babelRuntime from './webpack/babel-runtime';
import jsonLoader from './webpack/json-loader';
import cssLoader from './webpack/css-loader';
import sassLoader from './webpack/sass-loader';
import jsxLoader from './webpack/jsx-loader';

import plugins from './webpack/plugins';

import devServer from './webpack/dev-server';

import dontParse from './webpack/utils/do-not-parse';

import ENV from './webpack/env';

let config = {
	context: `${__dirname}/src`,
	entry: [
		'./client'
	],
	output: {
		path: `${__dirname}/build`,
		publicPath: '/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js'],
		modulesDirectories: [
			`${__dirname}/node_modules`,
			'node_modules'
		]
	},
	devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
};

config = merge(babelRuntime, config);

config = merge(config, devServer);

config = merge(config, jsonLoader);
config = merge(config, cssLoader);
config = merge(config, sassLoader);
config = merge(config, jsxLoader);

config = merge(config, plugins);

//optimization
// config = merge(config, dontParse({
// 	name: 'react',
// 	path: `${__dirname}/node_modules/react/dist/react.min.js`
// }));
//
// config = merge(config, dontParse({
// 	name: 'react-dom',
// 	path: `${__dirname}/node_modules/react-dom/dist/react-dom.min.js`
// }));
//
// config = merge(config, dontParse({
// 	name: 'sockjs-client',
// 	path: `${__dirname}/node_modules/`
// }));

module.exports = config;
