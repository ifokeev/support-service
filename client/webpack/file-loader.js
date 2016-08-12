import path from 'path';

const loaders = {
  module: {
    loaders: [{
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'file',
      exclude: /node_modules/,
      query: {
        name: '[path][name].[ext]',
        context: 'static'
      }
    }]
  }
};

export default loaders;
