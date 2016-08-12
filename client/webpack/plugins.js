import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import DedupePlugin from 'webpack/lib/optimize/DedupePlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import OccurrenceOrderPlugin from 'webpack/lib/optimize/OccurrenceOrderPlugin';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import NoErrorsPlugin from 'webpack/lib/NoErrorsPlugin';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import ENV from '../env';

import {
  extractAppCSS
} from './sass-loader';

import {
  extractComponentsCSS
} from './css-loader';

const plugins = {
  plugins: [
    new NoErrorsPlugin,
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      inject: 'body',
      favicon: './static/favicon.ico',
      minify: {
        collapseWhitespace: true
      }
    }),
    new LodashModuleReplacementPlugin,
    new DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: ENV
      })
    }),
    extractAppCSS,
    extractComponentsCSS,
    new DedupePlugin,
    new CommonsChunkPlugin("commons.chunk.[hash].js"),
    new OccurrenceOrderPlugin,
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
};

export default plugins;
