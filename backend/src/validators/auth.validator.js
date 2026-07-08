import { z } from "zod";
import { USER_ROLES } from "../constants/roles.js";

const name = z.string().trim().min(2).max(80);
const email = z.string().trim().email().toLowerCase();
const password = z.string().min(8).max(128);
const phone = z.string().trim().min(7).max(20);
const jsonField = (schema) =>
  z.preprocess((value) => {
    if (typeof value !== "string") return value;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }, schema);

const addressSchema = z
  .object({
    line1: z.string().trim().max(160).optional(),
    city: z.string().trim().max(80).optional(),
    country: z.string().trim().max(80).optional(),
    pincode: z.string().trim().max(20).optional(),
  })
  .partial()
  .optional();

export const loginSchema = z.object({
  body: z.object({
    email,
    password,
    role: z.enum([USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.PATIENT]),
  }),
});

export const patientRegisterSchema = z.object({
  body: z.object({
    firstName: name,
    lastName: name,
    email,
    phone,
    address: jsonField(z.union([z.string().trim().min(2).max(300), addressSchema]).optional()),
    dob: z.coerce.date().optional(),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    password,
  }),
});

export const doctorRegisterSchema = z.object({
  body: z.object({
    firstName: name,
    lastName: name,
    email,
    password,
    phone,
    qualification: z.string().trim().min(2).max(200),
    specialization: z.string().trim().min(2).max(120),
    experience: z.coerce.number().int().min(0).max(70),
    hospital: z.string().trim().min(2).max(160),
    clinic: z.string().trim().max(160).optional(),
    fee: z.coerce.number().min(0),
    gender: z.enum(["Male", "Female", "Other"]),
    address: jsonField(z.union([z.string().trim().min(2).max(300), addressSchema])),
    biography: z.string().trim().min(20).max(2000),
    licenseNumber: z.string().trim().min(3).max(80),
    availability: jsonField(
      z.array(
        z.object({
          day: z.string().trim().min(3).max(12),
          slots: z.array(z.string().trim().min(3).max(20)).min(1),
        }),
      )
        .min(1),
    ),
  }),
});
