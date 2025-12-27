import { Router } from "express";
import { createPollLimiter } from "../middlewares/rateLimitMid";
import { createPollComposer } from "../../../infra/services/composers/createPollComposer";
import { expressAdapter } from "../../adapters/expressAdapter";
import { getPollComposer } from "../../../infra/services/composers/getPollComposer";
import { submitVoteComposer } from "../../../infra/services/composers/submitVoteComposer";
export const pollRoute = Router();

pollRoute.post(
  "/create-poll",
  createPollLimiter,
  expressAdapter(createPollComposer())
);

pollRoute.get("/:pollCode/:voterId", expressAdapter(getPollComposer()));

pollRoute.post("/submit-vote", expressAdapter(submitVoteComposer()));

export default pollRoute;
