import {
	PORT
} from './env';

const devServer = {
	devServer: {
		port: PORT || 8080,
		host: '0.0.0.0',
		colors: true,
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
	}
};

export default devServer;
