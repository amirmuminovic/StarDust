// eslint-disable-next-line no-unused-vars

import config from './config.json';

Object.keys(config).forEach((key) => {
  process.env[key] = config[key];
});
