import { PollRepo } from "../../repositories/PollRepo";
import { OptionRepo } from "../../repositories/OptionRepo";
import { OptionResultRepo } from "../../repositories/OptionResultRepo";
import { VoteRepo } from "../../repositories/VoteRepo";
import { SubmitVoteController } from "../../../presentation/http/controller/submitVoteController";
import { SubmitVoteUseCase } from "../../../app/useCases/implementations/SubmitVoteUseCase";
import { PollServices } from "../../providers/PollServices";
import { TransactionService } from "../../providers/TransactionService";
import { SocketService } from "../../providers/SocketService";

export const submitVoteComposer = () => {
  const pollRepo = new PollRepo();
  const optionResultRepo = new OptionResultRepo();
  const voteRepo = new VoteRepo();
  const pollServices = new PollServices(pollRepo);
  const transactionService = new TransactionService(
    pollRepo,
    new OptionRepo(),
    optionResultRepo,
    voteRepo
  );
  const submitVoteUseCase = new SubmitVoteUseCase(
    optionResultRepo,
    voteRepo,
    pollServices,
    transactionService,
    new SocketService()
  );
  return new SubmitVoteController(submitVoteUseCase);
};
