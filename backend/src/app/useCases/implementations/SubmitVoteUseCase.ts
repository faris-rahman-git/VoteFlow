import { POLL_ERRORS } from "../../../domain/constants/errors";
import { ResponseDTO } from "../../../domain/entity/ResponseDTO";
import { IOptionResultRepo } from "../../repositories/IOptionResultRepo";
import { IVoteRepo } from "../../repositories/IVoteRepo";
import { ISubmitVoteUseCase } from "../interfaces/ISubmitVoteUseCase";
import { IPollServices } from "../../providers/IPollServices";
import { ITransactionService } from "../../providers/ITransactionService";
import { ISocketService } from "../../providers/ISocketService";
import { CreateVoteTransactionOuttype } from "../../contracts/poll";

export class SubmitVoteUseCase implements ISubmitVoteUseCase {
  constructor(
    private OptionResultRepo: IOptionResultRepo,
    private voteRepo: IVoteRepo,
    private transactionService: ITransactionService
  ) {}

  async execute(
    pollId: number,
    optionId: number,
    voterId: string
  ): Promise<ResponseDTO> {
    let result: CreateVoteTransactionOuttype;
    try {
      result = await this.transactionService.createVoteTransaction(
        pollId,
        optionId,
        voterId
      );
    } catch (err) {
      return {
        statusCode: 400,
        data: { message: POLL_ERRORS.VOTE_ALREADY_SUBMITTED },
      };
    }
    if (result.isExpired) {
      return { statusCode: 400, data: { message: POLL_ERRORS.POLL_EXPIRED } };
    }
    if (result.hasVoted) {
      return {
        statusCode: 400,
        data: { message: POLL_ERRORS.VOTE_ALREADY_SUBMITTED },
      };
    }

    const totalVotes = await this.voteRepo.getTotalVotes(pollId);

    const optionResultMap = await this.OptionResultRepo.getOptionsResult(
      pollId
    );
    return {
      statusCode: 200,
      data: {
        hasVoted: optionId,
        options: optionResultMap,
        totalVotes,
      },
    };
  }
}
