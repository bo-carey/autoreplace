import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

const config: Configuration = merge(commonConfig, {
  devtool: 'source-map',
  mode: 'development',
});

export default config;
