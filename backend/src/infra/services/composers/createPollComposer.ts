import { CreatePollUseCase } from "../../../app/useCases/implementations/CreatePollUseCase";
import { createPollController } from "../../../presentation/http/controller/createPollController";
import { PollServices } from "../../providers/PollServices";
import { TransactionService } from "../../providers/TransactionService";
import { PollRepo } from "../../repositories/PollRepo";
import { OptionRepo } from "../../repositories/OptionRepo";
import { OptionResultRepo } from "../../repositories/OptionResultRepo";

export const createPollComposer = () => {
  const pollRepo = new PollRepo();
  const pollServices = new PollServices(pollRepo);
  const transactionService = new TransactionService(
    pollRepo,
    new OptionRepo(),
    new OptionResultRepo()
  );
  const createPollUseCase = new CreatePollUseCase(
    pollServices,
    transactionService
  );
  return new createPollController(createPollUseCase);
};
