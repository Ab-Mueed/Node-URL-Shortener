import  express  from "express";
import urlRoute from "./routes/url.js";
import idRoute from "./routes/short_url.js"
import connectMongoDB from "./connection.js"


// Initialize Application
const app = express();

// Port Configuration
const PORT = 3001;

// MongoDB Connection
connectMongoDB("mongodb://127.0.0.1:27017/Node-URL-Shortener").then(() =>
  console.log("MongoDB Connected")
);

// Built-in Middleware
app.use(express.json())

// Custom Middleware
app.use("/url", urlRoute);
app.use("/", idRoute)

// Start Server
app.listen(PORT, () =>
  console.log(`Server Started at http://localhost:${PORT}`)
);
