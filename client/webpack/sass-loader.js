import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractAppCSS = new ExtractTextPlugin('app.[contenthash].css');

const loaders = {
  resolve: {
    extensions: ['.scss'],
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: extractAppCSS.extract('css!sass!postcss')
    }]
  }
};

export {
  extractAppCSS
};
export default loaders;
