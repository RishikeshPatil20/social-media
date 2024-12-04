import multer from 'multer';
import path from 'path';

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/resumes'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage });

export default upload;

