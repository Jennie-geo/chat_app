import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
// const upload = multer({
//   dest: 'images',
//   limits: {
//   fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//   if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
//   cb(new Error('Please upload an image.'))
//   }
//   cb(null, true)
//   }
//   })

export const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('Please upload an image.'));
    }
    cb(null, true);
  },
});
