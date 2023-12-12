import express from "express";
import {
  activateexam,
  saveCandidates,
  saveExamination,
  saveQuestionBanks,
  saveSchedule,
  viewSchedule,
} from "./controller.js";

const downloadAndUploadRouter = express.Router();

const rootPath = (path) => `/aguila/downloadandupload/${path}`;

downloadAndUploadRouter
  .post(rootPath("saveexam"), saveExamination)
  .post(rootPath("savecandidates"), saveCandidates)
  .post(rootPath("savequestionbanks"), saveQuestionBanks)
  .post(rootPath("saveschedule"), saveSchedule)
  .get(rootPath("viewschedule"), viewSchedule)
  .get(rootPath("activateexam/:id"), activateexam);

export default downloadAndUploadRouter;
