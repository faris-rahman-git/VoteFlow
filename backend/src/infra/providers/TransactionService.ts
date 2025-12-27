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
  ): Promise<number | null> {
    let votedOption: number | null = null;

    await sequelize.transaction(async (t) => {
      const hasVoted = await this.voteRepo.hasVoted(pollId, voterId, {
        transaction: t,
      });
      if (hasVoted) {
        votedOption = hasVoted;
        return;
      }
      await this.voteRepo.createVote(pollId, optionId, voterId, t);
      await this.optionResultRepo.updateOptionCount(optionId, t);
    });
    return votedOption;
  }
}
