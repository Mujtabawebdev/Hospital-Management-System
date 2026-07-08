import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signAccessToken = (subject) =>
  jwt.sign(
    {
      id: subject._id.toString(),
      role: subject.role,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );

export const verifyAccessToken = (token) => jwt.verify(token, env.jwtSecret);
