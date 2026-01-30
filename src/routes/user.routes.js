import express from "express";
import { checkAndCreateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", checkAndCreateUser);

export default router;
