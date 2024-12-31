import express from "express";
import { handleShortUrl } from "../controllers/url_controller.js";

const router = express.Router();

router.get("/:id", handleShortUrl);

export default router;
