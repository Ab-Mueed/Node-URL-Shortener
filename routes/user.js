import express from "express";
import {handleUserSignUp, handleUserLogin} from "../controllers/userController.js"

const router = express.Router();

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin)

export default router;
