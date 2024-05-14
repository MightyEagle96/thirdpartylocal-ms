import express from "express";
import centreRouter from "./centre/centreRouter.js";
import downloadAndUploadRouter from "./downloadAndUpload/downloadAndUploadRouter.js";
import examRouter from "./examControl/examRouter.js";
const router = express.Router();

router
  .use(centreRouter)
  .use(downloadAndUploadRouter)
  .use("/aguila/examination/", examRouter);

export default router;
