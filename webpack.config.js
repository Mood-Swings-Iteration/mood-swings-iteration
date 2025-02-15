const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    hot: true,
    open: true,
    port: 8080,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
