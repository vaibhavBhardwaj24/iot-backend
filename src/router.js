import { Router } from "express";
import sendData from "./sendData.js";

const router = Router();

router.route("/sendData").post(sendData);
router.route("/test").post(testServer);
export default router;
