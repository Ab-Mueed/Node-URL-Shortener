import express from "express";
import { handleHtmlRender } from "../controllers/url_controller.js";


const router = express.Router();

router.get("/", handleHtmlRender);

export default router;