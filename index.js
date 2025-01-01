import express from "express";
import path from "path";
import connectMongoDB from "./connection.js";
import cookieParser from "cookie-parser";

// Import Custom Middlewares
import {
  checkForAuthentication,
  restrictTo,
} from "./middlewares/authMiddleware.js";

// Import Routes
import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";

// Initialize Application
const app = express();

// Port Configuration
const PORT = 3001;

// MongoDB Connection
connectMongoDB("mongodb://127.0.0.1:27017/Node-URL-Shortener").then(() =>
  console.log("MongoDB Connected")
);

// Set View Engine
app.set("view engine", "ejs");

// Tell Express where View Files are Located
app.set("views", path.resolve("./views"));

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Custom Middleware - Route Registration
app.use(checkForAuthentication);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

// Start Server
app.listen(PORT, () =>
  console.log(`Server Started at http://localhost:${PORT}`)
);
