import path from 'node:path';
import { Config } from '@remotion/cli/config';

Config.overrideWebpackConfig(c => ({
  ...c,
  resolve: { ...c.resolve, alias: { ...c.resolve?.alias, react: path.resolve('node_modules/react'), 'react-dom': path.resolve('node_modules/react-dom') } },
}));
