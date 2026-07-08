import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.log("Cloudinary credentials are missing");
            return null;
        }

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            allowed_formats: ["png", "jpg", "jpeg", "webp", "pdf"],
        })

        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary");

        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
        console.log(error);
        return null;
    }
}



export { uploadOnCloudinary }
