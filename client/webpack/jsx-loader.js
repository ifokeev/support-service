const loaders = {
  resolve: {
    extensions: ['.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['lodash'],
        presets: ['es2015']
      }
    }]
  }
};

export default loaders;
