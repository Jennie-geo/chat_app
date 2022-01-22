// require('dotenv').config();
// import { v2 as cloudinary } from 'cloudinary';
// import DatauriParser from 'datauri/parser';
// const parser = new DatauriParser();
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// export async function uploadToCloudinary(localFilePath: any) {
//   const mainFolderName = 'main';
//   const filePathOnCloudinary = mainFolderName + '/' + localFilePath;
//   return cloudinary.uploader
//     .upload(localFilePath, { public_id: filePathOnCloudinary })
//     .then((result) => {
//       fs.unlinkSync(localFilePath);
//       return {
//         message: 'Success',
//         url: result.url,
//       };
//     })
//     .catch((error) => {
//       fs.unlinkSync(localFilePath);
//       return { message: 'Fail', Error: error };
//     });
// }
