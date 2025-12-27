import { CreateVoteTransactionOuttype } from "../../app/contracts/poll";
import { ITransactionService } from "../../app/providers/ITransactionService";
import { IOptionRepo } from "../../app/repositories/IOptionRepo";
import { IOptionResultRepo } from "../../app/repositories/IOptionResultRepo";
import { IPollRepo } from "../../app/repositories/IPollRepo";
import { IVoteRepo } from "../../app/repositories/IVoteRepo";
import { sequelize } from "../databases/dbConnection";

export class TransactionService implements ITransactionService {
  constructor(
    private pollRepo: IPollRepo,
    private optionRepo: IOptionRepo,
    private optionResultRepo: IOptionResultRepo,
    private voteRepo: IVoteRepo
  ) {}

  async createPollTransaction(
    pollCode: string,
    question: string,
    options: string[],
    expiresAt: Date
  ): Promise<void> {
    await sequelize.transaction(async (t) => {
      const pollId = await this.pollRepo.createPoll(
        question,
        pollCode,
        expiresAt,
        t
      );
      const optionIds = await this.optionRepo.createManyOption(
        pollId,
        options,
        t
      );
      await this.optionResultRepo.initOptionsResult(pollId, optionIds, t);
    });
  }

  async createVoteTransaction(
    pollId: number,
    optionId: number,
    voterId: string
  ): Promise<CreateVoteTransactionOuttype> {
    let result: CreateVoteTransactionOuttype= {
      hasVoted: null,
      isExpired: false,
    };

    await sequelize.transaction(async (t) => {
      const expiresAt = await this.pollRepo.getPollExpireDate(pollId, {
        transaction: t,
      });
      if (!expiresAt || expiresAt <= new Date()) {
        result.isExpired = true;
        return;
      }
      const hasVoted = await this.voteRepo.hasVoted(pollId, voterId, {
        transaction: t,
      });
      if (hasVoted) {
        result.hasVoted = hasVoted;
        return;
      }
      await this.voteRepo.createVote(pollId, optionId, voterId, t);
      await this.optionResultRepo.updateOptionCount(optionId, t);
    });
    return result;
  }
}
