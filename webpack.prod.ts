import * as path from 'path';
import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import WebExtPlugin from 'web-ext-plugin';
import commonConfig from './webpack.common';

const buildTarget: string = process.env.BUILD_TARGET || 'firefox';

const config: Configuration = merge(commonConfig, {
  optimization: {
    minimize: true,
  },
  mode: 'production',
  plugins: [
    new WebExtPlugin({
      sourceDir: path.resolve(__dirname, `dist/${buildTarget}`),
      artifactsDir: path.resolve(__dirname, `dist/${buildTarget}`),
      buildPackage: true,
      overwriteDest: true,
      outputFilename: `${buildTarget}.zip`,
    }),
  ],
});

export default config;
