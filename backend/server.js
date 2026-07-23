import dbConnection from "./src/config/db.js";
import { v2 as cloudinary } from "cloudinary";
import app from "./app.js";
import { assertRequiredEnv, env } from "./src/config/env.js";

assertRequiredEnv();

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
});

dbConnection()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server is running at port: ${env.port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
  //yo man wassup
