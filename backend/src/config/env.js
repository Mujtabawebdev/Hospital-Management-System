import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: toNumber(process.env.PORT, 3000),
  mongoUri: process.env.MONGODB_URI || "",
  databaseName: process.env.DB_NAME || "mediHub",
  jwtSecret: process.env.JWT_SECRET_KEY || "",
  jwtExpiresIn: process.env.JWT_EXPIRES || "10h",
  cookieExpireMs: toNumber(process.env.COOKIE_EXPIRE, 10 * 60 * 60 * 1000),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

export const assertRequiredEnv = () => {
  const missing = [];

  if (!env.mongoUri) missing.push("MONGODB_URI");
  if (!env.jwtSecret) missing.push("JWT_SECRET_KEY");

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
};
