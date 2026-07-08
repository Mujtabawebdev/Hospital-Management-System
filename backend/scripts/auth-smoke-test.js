import mongoose from "mongoose";
import dbConnection from "../src/config/db.js";
import { assertRequiredEnv } from "../src/config/env.js";
import { USER_ROLES } from "../src/constants/roles.js";
import { User } from "../src/models/user.model.js";
import { signAccessToken, verifyAccessToken } from "../src/services/token.service.js";

assertRequiredEnv();
await dbConnection();

const email = `auth-smoke-${Date.now()}@example.com`;
const password = "AuthSmoke123!";

try {
  const user = await User.create({
    firstName: "Auth",
    lastName: "Smoke",
    email,
    phone: "03001234567",
    password,
    role: USER_ROLES.PATIENT,
  });

  const storedUser = await User.findById(user._id).select("+password");

  if (!storedUser) {
    throw new Error("Smoke user was not persisted");
  }

  if (storedUser.password === password) {
    throw new Error("Password was stored in plain text");
  }

  if (!(await storedUser.comparePassword(password))) {
    throw new Error("Correct password did not match");
  }

  if (await storedUser.comparePassword("WrongPassword123!")) {
    throw new Error("Incorrect password matched");
  }

  const token = signAccessToken(storedUser);
  const decoded = verifyAccessToken(token);

  if (decoded.id !== storedUser._id.toString() || decoded.role !== USER_ROLES.PATIENT) {
    throw new Error("JWT payload did not round-trip correctly");
  }

  console.log("Auth smoke test passed: password hash, password compare, and JWT verification work.");
} finally {
  await User.deleteOne({ email });
  await mongoose.disconnect();
}
