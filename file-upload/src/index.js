const express = require('express')
const loadExpress = require('./loaders/expressLoader');
require('./config');

(async () => {
  const app = express();
  await loadExpress(app);
  app.listen(process.env.PORT, () => console.log(`Server is live on port ${process.env.PORT}!`));
})()
