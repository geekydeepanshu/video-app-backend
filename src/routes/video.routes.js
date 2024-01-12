import Router from "express";
import { videoDelete } from "../controllers/video.controller.js";

const router = Router()

router.route("/photo").post(videoDelete);
router.route("/video").post(videoDelete);

export default router;