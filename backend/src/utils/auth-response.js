import { env } from "../config/env.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { signAccessToken } from "../services/token.service.js";

export const cookieNameForRole = (role) => `${role.toLowerCase()}Token`;

export const publicUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  dob: user.dob,
  gender: user.gender,
  profilePicture: user.profilePicture,
  role: user.role,
  status: user.status,
  emailVerified: user.emailVerified,
});

export const sendAuthResponse = (res, user, message, statusCode = 200) => {
  const token = signAccessToken(user);

  return res
    .status(statusCode)
    .cookie(cookieNameForRole(user.role), token, {
      expires: new Date(Date.now() + env.cookieExpireMs),
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: env.nodeEnv === "production" ? "none" : "lax",
    })
    .json(
      new ApiResponse(
        statusCode,
        {
          user: publicUser(user),
        },
        message,
      ),
    );
};
