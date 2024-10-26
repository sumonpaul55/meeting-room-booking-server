import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUploads } from "./cloudinary.confi";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUploads,
});

export const multerUpload = multer({ storage });
