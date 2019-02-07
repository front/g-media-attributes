const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cleanBuild = new CleanWebpackPlugin(['build']);

module.exports = {
  entry: './src/index.js',
  externals: {
    react: 'React',
    wp: 'wp',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  mode: 'production',
  plugins: [
    cleanBuild,
  ],
};
