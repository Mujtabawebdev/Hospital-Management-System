import multer from "multer";

// Files stay in memory only until they are streamed to Cloudinary.
// Nothing is written to backend/public/temp or any other local directory.
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});
