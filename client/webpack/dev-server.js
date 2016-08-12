import {
  PORT
} from '../env';

const devServer = {
  devServer: {
    port: PORT || 8080,
    host: '0.0.0.0',
    colors: true,
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/spree/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};

export default devServer;
