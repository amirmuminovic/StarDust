const multer  = require('multer')
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const currentTime = Date.now()
      req.fileName = `${currentTime}_${file.originalname}`
      cb(null, req.fileName)
    },
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads'))
    }
  })
})

module.exports = upload;
