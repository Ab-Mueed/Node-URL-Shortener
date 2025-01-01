import express from "express";
import { restrictTo } from "../middlewares/authMiddleware.js";
import { handleHtmlRender } from "../controllers/urlController.js";
import {
  handleSignUpRender,
  handleLoginRender,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", restrictTo(["NORMAL", "ADMIN"]), handleHtmlRender);

router.get("/signup", handleSignUpRender);

router.get("/login", handleLoginRender);

router.get("/admin", restrictTo(["ADMIN"]), handleHtmlRender);

export default router;
