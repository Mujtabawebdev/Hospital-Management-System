import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const uploadDir = path.resolve("public/temp");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    }
});

export const upload = multer({
    storage,
});
