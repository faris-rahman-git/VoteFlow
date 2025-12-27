import { POLL_ERRORS } from "../../../domain/constants/errors";
import { ResponseDTO } from "../../../domain/entity/ResponseDTO";
import { IOptionResultRepo } from "../../repositories/IOptionResultRepo";
import { IVoteRepo } from "../../repositories/IVoteRepo";
import { ISubmitVoteUseCase } from "../interfaces/ISubmitVoteUseCase";
import { IPollServices } from "../../providers/IPollServices";
import { ITransactionService } from "../../providers/ITransactionService";
import { ISocketService } from "../../providers/ISocketService";

export class SubmitVoteUseCase implements ISubmitVoteUseCase {
  constructor(
    private OptionResultRepo: IOptionResultRepo,
    private voteRepo: IVoteRepo,
    private pollServices: IPollServices,
    private transactionService: ITransactionService,
    private socketService: ISocketService
  ) {}

  async execute(
    pollId: number,
    optionId: number,
    voterId: string
  ): Promise<ResponseDTO> {
    const isActive = await this.pollServices.checkPollExpired(pollId);
    if (!isActive) {
      return { statusCode: 400, data: { message: POLL_ERRORS.POLL_EXPIRED } };
    }
    const hasVoted = await this.transactionService.createVoteTransaction(
      pollId,
      optionId,
      voterId
    );
    if (hasVoted) {
      return {
        statusCode: 400,
        data: { message: POLL_ERRORS.VOTE_ALREADY_SUBMITTED },
      };
    }

    const totalVotes = await this.voteRepo.getTotalVotes(pollId);

    const optionResultMap = await this.OptionResultRepo.getOptionsResult(
      pollId
    );
    console.log("hasVoted1:- ", hasVoted);

    this.socketService.EmitUpdatedPoll(pollId, {
      totalVotes,
      options: optionResultMap,
    });
    console.log("hasVoted2:- ", hasVoted);
    return {
      statusCode: 200,
      data: {
        isActive,
        hasVoted: optionId,
        options: optionResultMap,
        totalVotes,
      },
    };
  }
}
