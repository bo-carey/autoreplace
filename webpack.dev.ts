import * as path from 'path';
import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import WebExtPlugin from 'web-ext-plugin';
import commonConfig from './webpack.common';

const buildTarget: string = process.env.BUILD_TARGET || 'firefox';
const gameLocation = process.env.GAME_LOCATIONS || '';

const config: Configuration = merge(commonConfig, {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new WebExtPlugin({
      sourceDir: path.resolve(__dirname, `dist/${buildTarget}`),
      artifactsDir: path.resolve(__dirname, `dist/${buildTarget}`),
      buildPackage: true,
      overwriteDest: true,
      browserConsole: true,
      startUrl: gameLocation,
    }),
  ],
});

export default config;
