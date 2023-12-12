import express from "express";
import centreRouter from "./centre/centreRouter.js";
import downloadAndUploadRouter from "./downloadAndUpload/downloadAndUploadRouter.js";
const router = express.Router();

router.use(centreRouter).use(downloadAndUploadRouter);

export default router;
