import express from "express";
import {
  activatedExamMiddleware,
  examCandidates,
  reloginAllCandidates,
  reloginCandidate,
} from "./controller.js";

const examRouter = express.Router();

const rootPath = (path) => `/aguila/examination/${path}`;
examRouter
  .get(rootPath("candidates"), activatedExamMiddleware, examCandidates)
  .post(rootPath("relogincandidate"), activatedExamMiddleware, reloginCandidate)
  .get(
    rootPath("reloginallcandidates"),
    activatedExamMiddleware,
    reloginAllCandidates
  );

export default examRouter;
