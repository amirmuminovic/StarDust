const { fileService } = require('../service');

const {
  getMediaLinks,
  uploadFile,
} = fileService

const uploadFileToBucketController = async (req, res) => {
  const { username } = req.body;
  
  try {
    await uploadFile({
      bucketName: 'neptune-images',
      filePrefix: username,
      reqFileName: req.fileName
    })
    res.sendStatus(200);
  } catch (error) {
    console.log('++++++++++++++++++++');
    console.log(error);
    console.log('++++++++++++++++++++');
    res.send(error)
  }
}

const getFilesByUserNameController = async (req, res) => {
  const { prefix } = req.query;
  try {
    const mediaLinks = await getMediaLinks({
      bucketName: 'neptune-images',
      prefix
    })
    res.send(mediaLinks);
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getFilesByUserNameController,
  uploadFileToBucketController,
}