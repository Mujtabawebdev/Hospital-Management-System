import mongoose from "mongoose";
import dbConnection from "../src/config/db.js";
import { User } from "../src/models/user.model.js";
import { USER_ROLES } from "../src/constants/roles.js";
import { assertRequiredEnv } from "../src/config/env.js";

const required = ["ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_FIRST_NAME", "ADMIN_LAST_NAME", "ADMIN_PHONE"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

assertRequiredEnv();
await dbConnection();

try {
  const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    if (existingAdmin.role !== USER_ROLES.ADMIN) {
      console.error(`An account already exists for ${email}, but it is not an admin.`);
      process.exitCode = 1;
    } else {
      existingAdmin.firstName = process.env.ADMIN_FIRST_NAME;
      existingAdmin.lastName = process.env.ADMIN_LAST_NAME;
      existingAdmin.phone = process.env.ADMIN_PHONE;
      existingAdmin.password = process.env.ADMIN_PASSWORD;
      await existingAdmin.save();

      console.log(`Admin updated: ${email}`);
    }
  } else {
    await User.create({
      firstName: process.env.ADMIN_FIRST_NAME,
      lastName: process.env.ADMIN_LAST_NAME,
      email,
      phone: process.env.ADMIN_PHONE,
      password: process.env.ADMIN_PASSWORD,
      role: USER_ROLES.ADMIN,
    });

    console.log(`Admin created: ${email}`);
  }
} finally {
  await mongoose.disconnect();
}
