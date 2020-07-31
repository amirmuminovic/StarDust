import {Router as router} from 'express';
import {fileControllers} from '../controllers';
import upload from '../loaders/multerLoader';

const {
  uploadFileToBucketController,
  getFilesByUserNameController,
} = fileControllers;

const fileRoutes = router();

fileRoutes.post(
  '/bananas',
  upload.single('file'),
  uploadFileToBucketController,
);

fileRoutes.get('/bananas', getFilesByUserNameController);

export default fileRoutes;
