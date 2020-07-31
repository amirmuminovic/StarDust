import {unlink} from 'fs';
import {promisify} from 'util';
import path from 'path';
import {StorageBucket} from '../data';

const unlinkProm = promisify(unlink);

const uploadFile = async ({bucketName, filePrefix, reqFileName}) => {
  const fileName = `${filePrefix}/${(new Date()).toISOString()}`;
  const pathToFile = path.join(__dirname, `../../uploads/${reqFileName}`);

  const bucket = new StorageBucket({name: bucketName});
  await bucket.createBucketIfNotExist();
  await bucket.uploadFile(fileName, pathToFile);

  const removePath = path.join(__dirname, `../../uploads/${reqFileName}`);
  await unlinkProm(removePath);
};

const getMediaLinks = async (params) => {
  const {bucketName, filePrefix} = params;
  const bucket = new StorageBucket({name: bucketName});
  await bucket.createBucketIfNotExist();
  const mediaLinks = await bucket.getFileLinks(filePrefix);

  return mediaLinks;
};

export default {
  uploadFile,
  getMediaLinks,
};
