import express from "express";
import {
  activatedExamMiddleware,
  examCandidates,
  reloginAllCandidates,
  reloginCandidate,
} from "./controller.js";
import {
  endExam,
  getResponses,
  updateExamWithUploaded,
} from "../downloadAndUpload/controller.js";

const examRouter = express.Router();

const rootPath = (path) => `/aguila/examination/${path}`;
examRouter
  .get(rootPath("candidates"), activatedExamMiddleware, examCandidates)
  .post(rootPath("relogincandidate"), activatedExamMiddleware, reloginCandidate)
  .get(
    rootPath("reloginallcandidates"),
    activatedExamMiddleware,
    reloginAllCandidates
  )
  .get(rootPath("endexam"), activatedExamMiddleware, endExam)
  .get(rootPath("getresponses/:id"), getResponses)
  .get(rootPath("uploadresponse/:id"), updateExamWithUploaded);

export default examRouter;
