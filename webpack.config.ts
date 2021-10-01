import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const buildTarget: string = process.env.BUILD_TARGET || 'firefox';
const isProduction: boolean = process.env.NODE_ENV === 'production';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: {
    main: ['./src/index.ts'],
  },
  output: {
    path: path.resolve(__dirname, `dist/${buildTarget}`),
    filename: 'main.js',
    clean: true,
  },
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png)$/,
        include: path.resolve('target/shared/icons/'),
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'target/shared/' }, { from: `target/${buildTarget}/` }],
    }),
  ],
  // devServer: {
  //   watchFiles: ['src/index.ts'],
  // },
  devtool: !isProduction && 'source-map',
  stats: {
    warnings: false,
  },
  optimization: {
    minimize: isProduction,
  },
};

module.exports = config;
// Thanks to https://github.com/joelshepherd/tabliss for demonstrating this.
