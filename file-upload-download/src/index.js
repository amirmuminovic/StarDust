// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

import express from 'express';
import loadExpress from './loaders/expressLoader';
import('./config');

(async () => {
  const app = express();
  await loadExpress(app);
  app.listen(process.env.PORT, () => {
    console.log(`Server is live on port ${process.env.PORT}!`);
  });
})();
