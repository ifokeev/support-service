import path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';

import babelRuntime from './webpack/babel-runtime';
import jsonLoader from './webpack/json-loader';
import cssLoader from './webpack/css-loader';
import sassLoader from './webpack/sass-loader';
import jsxLoader from './webpack/jsx-loader';
import fileLoader from './webpack/file-loader';

import postcss from './webpack/postcss';

import plugins from './webpack/plugins';

import devServer from './webpack/dev-server';

import alias from './webpack/utils/alias';
import chunk from './webpack/utils/chunk';

import ENV from './env';

let config = {
  root: path.resolve(__dirname),
  entry: {
    client: ['./src/client']
  },
  output: {
    path: './build',
    publicPath: '/',
    filename: '[name].bundle.[hash].js',
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [
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
config = merge(config, fileLoader);

config = merge(config, postcss);

config = merge(config, plugins);

// if (ENV === 'production') {
//   //optimization
//   config = merge(config, alias({
//     name: 'react',
//     path: `${__dirname}/node_modules/react/dist/react.min.js`
//   }));
//
//   config = merge(config, alias({
//     name: 'react-dom',
//     path: `${__dirname}/node_modules/react-dom/dist/react-dom.min.js`
//   }));
//
//   config = merge(config, alias({
//     name: 'react-router',
//     path: `${__dirname}/node_modules/react-router/umd/ReactRouter.min.js`
//   }));
//
//   config = merge(config, chunk({
//     react: ['react', 'react-dom', 'react-router']
//   }));
// }

console.log(config);
export default config;
