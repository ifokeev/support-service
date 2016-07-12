const loaders = {
  resolve: {
    extensions: ['.json'],
  },
  module: {
    loaders: [{
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json'
    }]
  }
};

export default loaders;
