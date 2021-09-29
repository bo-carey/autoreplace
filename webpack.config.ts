import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExtensionReloader = require('webpack-extension-reloader');

const buildTarget: string = process.env.BUILD_TARGET || 'firefox';
const isProduction: boolean = process.env.NODE_ENV === 'production';

interface ExtensionConfiguration extends webpack.Configuration {
  devServer: {
    overlay: boolean;
  };
}

const config: ExtensionConfiguration = {
  entry: {
    main: ['./src/index.ts'],
  },
  output: {
    path: path.resolve('dist', buildTarget),
    publicPath: '/',
    filename: '[name].js',
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
          name: '[name].[ext]',
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
  config?.plugins?.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  );
}

if (!isProduction) {
  config?.plugins?.push(
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
