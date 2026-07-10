import crypto from "crypto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});
const hashOtp = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");

export const issueEmailOtp = async (account) => {
  const otp = String(crypto.randomInt(100000, 1000000));
  account.emailVerificationOtp = hashOtp(otp);
  account.emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000);
  await account.save({ validateBeforeSave: false });
  try {
    await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: account.email, subject: "Verify your MediHub email", text: `Your MediHub verification code is ${otp}. It expires in 10 minutes.` });
    return true;
  } catch {
    return false;
  }
};

export const otpMatches = (account, otp) => Boolean(account.emailVerificationExpires > new Date() && account.emailVerificationOtp === hashOtp(otp));

export const issuePasswordResetOtp = async (account) => {
  const otp = String(crypto.randomInt(100000, 1000000));
  account.passwordResetOtp = hashOtp(otp);
  account.passwordResetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
  account.passwordResetToken = undefined;
  account.passwordResetTokenExpires = undefined;
  await account.save({ validateBeforeSave: false });
  try {
    await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: account.email, subject: "Reset your MediHub password", text: `Your MediHub password reset code is ${otp}. It expires in 10 minutes.` });
    return true;
  } catch {
    return false;
  }
};

export const passwordResetOtpMatches = (account, otp) => Boolean(account.passwordResetOtpExpires > new Date() && account.passwordResetOtp === hashOtp(otp));
export const hashResetToken = hashOtp;
