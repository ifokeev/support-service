const loaders = {
  resolve: {
    extensions: ['.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};

export default loaders;
