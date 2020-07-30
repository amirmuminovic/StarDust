const { unlink } = require('fs');
const { promisify } = require('util');
const path = require('path')

const { GCPBucketRepo: StorageBucket } = require('../data')

const unlinkProm = promisify(unlink);

const uploadFile = async ({bucketName, filePrefix, reqFileName}) => {
  const fileName = `${filePrefix}/${(new Date()).toISOString()}`
  const bucket = new StorageBucket({name:bucketName});
  await bucket.createBucketIfNotExist()
  await bucket.uploadFile(fileName, path.join(__dirname, `../../uploads/${reqFileName}`))
  const removePath = path.join(__dirname, `../../uploads/${reqFileName}`)
  await unlinkProm(removePath)
}

const getMediaLinks = async (params) => {
  const { bucketName, filePrefix } = params;
  const bucket = new StorageBucket({ name: bucketName });
  await bucket.createBucketIfNotExist()
  const mediaLinks = await bucket.getFileLinks(filePrefix)

  return mediaLinks;
}

module.exports = {
  uploadFile,
  getMediaLinks,
}
