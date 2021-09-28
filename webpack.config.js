/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config');

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ExtensionReloader = require('webpack-extension-reloader');

const buildTarget = process.env.BUILD_TARGET || 'firefox';
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    main: ['./src/index.ts'],
  },
  output: {
    path: path.resolve('dist', buildTarget),
    publicPath: '/',
    filename: isWeb ? '[name].[contenthash:12].js' : '[name].js',
  },
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isWeb ? '[name].[contenthash:12].[ext]' : '[name].[ext]',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve('./src'),
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'target/shared' },
        {
          from: `target/${buildTarget}`,
        },
      ],
    }),
  ],
  devServer: {
    overlay: true,
  },
  devtool: 'source-map',
  stats: {
    warnings: false,
  },
};

if (isProduction) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  );
}

if (!isWeb && !isProduction) {
  config.plugins.push(
    new ExtensionReloader({
      reloadPage: true,
      entries: {
        extensionPage: 'main',
      },
    }),
  );
}

module.exports = config;
// Thanks to https://github.com/joelshepherd/tabliss for demonstrating this.
