import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (fileBuffer) => {
  if (!fileBuffer || !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return null;
  }

  try {
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", allowed_formats: ["png", "jpg", "jpeg", "webp", "pdf"] },
        (error, result) => error ? reject(error) : resolve(result),
      );
      stream.end(fileBuffer);
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    return null;
  }
};
