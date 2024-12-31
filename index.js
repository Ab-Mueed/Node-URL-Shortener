import express, { urlencoded } from "express";
import path from "path";
import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import connectMongoDB from "./connection.js";

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

// Custom Middleware
app.use("/url", urlRoute);
app.use("/", staticRoute);

// Start Server
app.listen(PORT, () =>
  console.log(`Server Started at http://localhost:${PORT}`)
);
