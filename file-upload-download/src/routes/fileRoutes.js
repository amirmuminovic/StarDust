const { Router } = require('express');

const {
  fileControllers
} = require('../controllers');

const upload = require('../loaders/multerLoader')

const {
  uploadFileToBucketController,
  getFilesByUserNameController,
} = fileControllers

const fileRoutes = Router();

fileRoutes.post('/bananas', upload.single('file'), uploadFileToBucketController)

fileRoutes.get('/bananas', getFilesByUserNameController);

module.exports = fileRoutes;
