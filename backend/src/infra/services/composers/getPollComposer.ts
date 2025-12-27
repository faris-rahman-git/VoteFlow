import { getPollController } from "../../../presentation/http/controller/getPollController";
import { GetPollUseCase } from "../../../app/useCases/implementations/GetPollUseCase";
import { PollRepo } from "../../repositories/PollRepo";
import { OptionRepo } from "../../repositories/OptionRepo";
import { OptionResultRepo } from "../../repositories/OptionResultRepo";
import { VoteRepo } from "../../repositories/VoteRepo";

export const getPollComposer = () => {
  const getPollUseCase = new GetPollUseCase(
    new PollRepo(),
    new OptionRepo(),
    new OptionResultRepo(),
    new VoteRepo()
  );
  return new getPollController(getPollUseCase);
};
