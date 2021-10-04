import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

const config: Configuration = merge(commonConfig, {
  optimization: {
    minimize: true,
  },
  mode: 'production',
});

export default config;
