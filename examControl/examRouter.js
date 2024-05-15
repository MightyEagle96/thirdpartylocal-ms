import express from "express";
import {
  activatedExamMiddleware,
  examCandidates,
  reloginAllCandidates,
  reloginCandidate,
  resetCandidate,
} from "./controller.js";
import {
  endExam,
  getResponses,
  updateExamWithUploaded,
} from "../downloadAndUpload/controller.js";

const examRouter = express.Router();

examRouter
  .get("/candidates", activatedExamMiddleware, examCandidates)
  .post("/relogincandidate", activatedExamMiddleware, reloginCandidate)
  .get("/reloginallcandidates", activatedExamMiddleware, reloginAllCandidates)
  .post("/resetcandidate", activatedExamMiddleware, resetCandidate)
  .get("/endexam", activatedExamMiddleware, endExam)
  .get("/getresponses/:id", getResponses)
  .get("/uploadresponse/:id", updateExamWithUploaded);

export default examRouter;
