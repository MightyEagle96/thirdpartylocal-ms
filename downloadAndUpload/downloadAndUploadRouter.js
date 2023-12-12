import express from "express";
import {
  saveCandidates,
  saveExamination,
  saveQuestionBanks,
  saveSchedule,
} from "./controller.js";

const downloadAndUploadRouter = express.Router();

const rootPath = (path) => `/aguila/downloadandupload/${path}`;

downloadAndUploadRouter
  .post(rootPath("saveexam"), saveExamination)
  .post(rootPath("savecandidates"), saveCandidates)
  .post(rootPath("savequestionbanks"), saveQuestionBanks)
  .post(rootPath("saveschedule"), saveSchedule);

export default downloadAndUploadRouter;
