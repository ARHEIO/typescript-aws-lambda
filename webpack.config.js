const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    get: './src/GET/get.ts',
    post: './src/POST/post.ts',
  },
  externals: [
    nodeExternals({
      whitelist: [/^((?!aws-sdk).)*$/] // aws-sdk is provided in the lambda environment
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
    concatenateModules: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
  target: 'node'
};
