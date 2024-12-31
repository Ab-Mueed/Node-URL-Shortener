import express from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleShortUrl
} from "../controllers/url_controller.js";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:id", handleGetAnalytics);
router.get("/:id", handleShortUrl);

export default router;
