import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const currentTime = Date.now();
      req.fileName = `${currentTime}_${file.originalname}`;
      cb(null, req.fileName);
    },
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads'));
    },
  }),
});

export default upload;
