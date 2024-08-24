import { Router } from "express";
import sendData from "./sendData.js";

const router = Router();

router.route("/sendData").post(sendData);
export default router;
