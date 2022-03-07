const path = require('path');

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
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['src', 'node_modules'],
  }
}