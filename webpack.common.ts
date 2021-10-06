import * as path from 'path';
import { Configuration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebExtPlugin from 'web-ext-plugin';

const buildTarget: string = process.env.BUILD_TARGET || 'firefox';

const config: Configuration = {
  entry: {
    backgroundPage: path.join(__dirname, 'src/background.ts'),
    contentScript: path.join(__dirname, 'src/contentScript.ts'),
    popup: path.join(__dirname, 'src/popup/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, `dist/${buildTarget}`),
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
        options: {
          configFile: path.resolve('./tsconfig.json'),
          compilerOptions: {
            noEmit: false,
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'target/shared/', to: path.resolve(__dirname, `dist/${buildTarget}`) },
        { from: `target/${buildTarget}/`, to: path.resolve(__dirname, `dist/${buildTarget}`) },
      ],
    }),
    new WebExtPlugin({
      sourceDir: path.resolve(__dirname, `dist/${buildTarget}`),
      artifactsDir: path.resolve(__dirname, `dist`),
      buildPackage: true,
      overwriteDest: true,
      outputFilename: `${buildTarget}.zip`,
      browserConsole: true,
      startUrl: 'https://twitter.com',
    }),
  ],
  stats: {
    warnings: true,
  },
};

export default config;
