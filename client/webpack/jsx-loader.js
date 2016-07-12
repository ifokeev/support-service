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
        plugins: ['lodash', 'transform-runtime', 'transform-decorators-legacy'],
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  }
};

export default loaders;
