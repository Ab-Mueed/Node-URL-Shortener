import express from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} from "../controllers/url_controller.js";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:id", handleGetAnalytics);

export default router;
