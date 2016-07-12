import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractComponentsCSS = new ExtractTextPlugin('components.css');

const loaders = {
  resolve: {
    extensions: ['.css'],
  },
  module: {
    loaders: [{
      test: /\.css$/,
      exclude: /node_modules/,
      loader: extractComponentsCSS.extract('style', 'css')
    }]
  }
};

export {
  extractComponentsCSS
};
export default loaders;
