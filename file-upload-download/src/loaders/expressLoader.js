import {json} from 'body-parser';
import {fileRoutes} from '../routes';

const loadExpress = async (app) => {
  app.use(json());

  app.use(fileRoutes);
};

export default loadExpress;
