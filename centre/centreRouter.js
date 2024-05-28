import express from "express";
import {
  loginCentre,
  resetServer,
  saveCentre,
  toggleZeroClient,
  zeroClientStatus,
} from "./centreController.js";

const centreRouter = express.Router();

const rootPath = (path) => `/aguila/centre/${path}`;

centreRouter
  .post(rootPath("save"), saveCentre)
  .post(rootPath("login"), loginCentre)
  .get(rootPath("resetserver"), resetServer)
  .get(rootPath("togglezeroclient"), toggleZeroClient)
  .get(rootPath("zeroclientstatus"), zeroClientStatus);

export default centreRouter;
