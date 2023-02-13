import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// const { CLOUD_NAME, API_KEY, API_SECRET } = import('../config');

// Account access information
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Uploading Image Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
  }
  // format: async (req, file) => ['png', 'jpg'],
  // public_id: (req, file) => 'computed-filename-using-request',
  // transformation: [
  //   { if: 'w_gt_1900', width: 1900, crop: 'scale' },
  //   { if: 'h_gt_1900', height: 1900, crop: 'scale' },
  //   { quality: 'auto' },
  //   { format: 'jpg' },
  // ],
});

export const parser = multer({ storage: storage });
