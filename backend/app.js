import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middleware/error.middleware.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import { env } from "./src/config/env.js";

const app = express();

// cors middleware configuration connects frontend to backend
app.use(
  cors({
    origin: [env.frontendUrl],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// import routes
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.routes.js";
import contactUsRouter from "./src/routes/contactus.routes.js";
import appointmentRouter from "./src/routes/appointment.routes.js";
import doctorRouter from "./src/routes/doctor.routes.js";
import medicineRouter from "./src/routes/medicine.routes.js";
import CartRouter from "./src/routes/user-cart.routes.js";
import PaymentRouter from "./src/routes/payment.routes.js";
import TestimonialRouter from "./src/routes/testimonial.routes.js";

// Define the root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the homepage!');
// });

// routes declaration
app.use("/api/v1/user", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", contactUsRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/medicines", medicineRouter);
app.use("/api/v1/medicines-cart", CartRouter)
app.use("/api/v1/payment", PaymentRouter)
app.use("/api/v1/testimonial", TestimonialRouter)

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "MediHub API is healthy" });
});

// error middleware
app.use(errorHandler);
export default app;
