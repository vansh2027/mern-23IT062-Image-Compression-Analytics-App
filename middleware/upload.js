import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'server/uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;
