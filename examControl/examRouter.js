import express from "express";
import { activatedExamMiddleware, examCandidates } from "./controller.js";

const examRouter = express.Router();

const rootPath = (path) => `/aguila/examination/${path}`;
examRouter.get(rootPath("candidates"), activatedExamMiddleware, examCandidates);

export default examRouter;
