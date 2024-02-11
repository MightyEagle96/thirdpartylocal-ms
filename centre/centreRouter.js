import express from "express";
import { loginCentre, resetServer, saveCentre } from "./centreController.js";

const centreRouter = express.Router();

const rootPath = (path) => `/aguila/centre/${path}`;

centreRouter
  .post(rootPath("save"), saveCentre)
  .post(rootPath("login"), loginCentre)
  .get(rootPath("resetserver"), resetServer);

export default centreRouter;
