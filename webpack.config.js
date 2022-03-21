const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webps.min.js',
    library: 'package',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/test.html',
      HtmlWebpackPlugin: {
        files: {
          webps: 'webps.min.js',
        }
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['src', 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}