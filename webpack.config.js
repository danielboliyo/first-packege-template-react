const path = require('path');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-drop-and-drag.js',
    library: 'my-drop-and-drag',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
};
