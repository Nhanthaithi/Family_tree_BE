import { Request } from 'express';
import * as multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import cloudinary from './Cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let FileFormat = file.originalname.split('.').pop();
    let resourceType = 'image';

    if (['mp4', 'avi', 'mov', 'mkv'].includes(FileFormat)) {
      resourceType = 'video';
    }

    return {
      folder: 'project-giapha',
      format: FileFormat,
      public_id: `${file.fieldname}-${Date.now()}`,
      resource_type: resourceType,
      eager: [
        { width: 1000, crop: 'scale', quality: 'auto', fetch_format: 'auto' },
      ],
      eager_async: true,
    };
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/mkv',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Chỉ chấp nhận các định dạng: JPEG, PNG, GIF, MP4, AVI, MOV, MKV',
      ),
      false,
    );
  }
};

const uploadLimits = {
  fileSize: 100 * 1024 * 1024,
};

export const multerUpload = {
  storage: storage,
  fileFilter: fileFilter,
  limits: uploadLimits,
};
