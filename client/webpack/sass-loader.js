import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractAppCSS = new ExtractTextPlugin('app.css');

const loaders = {
  resolve: {
    extensions: ['.scss'],
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: extractAppCSS.extract('style', 'css', 'sass')
    }]
  }
};

export {
  extractAppCSS
};
export default loaders;
