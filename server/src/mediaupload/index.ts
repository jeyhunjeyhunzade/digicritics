import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const options: UploadApiOptions = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export const uploadSingleMedia = (image: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (error, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      console.log("error", error?.message);
      return reject({ message: error?.message });
    });
  });
};

export const uploadMultipleMedia = (images: any) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base: any) => uploadSingleMedia(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};
