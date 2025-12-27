import { Router } from "express";
import { createPollLimiter } from "../middlewares/rateLimitMid";
import { createPollComposer } from "../../../infra/services/composers/createPollComposer";
import { expressAdapter } from "../../adapters/expressAdapter";
export const pollRoute = Router();

pollRoute.post(
  "/create-poll",
  createPollLimiter,
  expressAdapter(createPollComposer())
);

export default pollRoute;
