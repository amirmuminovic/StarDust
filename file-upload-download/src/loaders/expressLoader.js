const { json } = require('body-parser')
const { fileRoutes } = require('../routes');

const loadExpress = async (app) => {
  app.use(json())

  app.use(fileRoutes);
}

module.exports = loadExpress;
