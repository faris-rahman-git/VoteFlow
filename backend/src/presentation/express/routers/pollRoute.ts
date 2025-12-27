import { Router } from "express";
import { createPollLimiter } from "../middlewares/rateLimitMid";
import { createPollComposer } from "../../../infra/services/composers/createPollComposer";
import { expressAdapter } from "../../adapters/expressAdapter";
import { getPollComposer } from "../../../infra/services/composers/getPollComposer";
export const pollRoute = Router();

pollRoute.post(
  "/create-poll",
  createPollLimiter,
  expressAdapter(createPollComposer())
);

pollRoute.get("/poll/:pollCode/:voterId", expressAdapter(getPollComposer()));

export default pollRoute;
