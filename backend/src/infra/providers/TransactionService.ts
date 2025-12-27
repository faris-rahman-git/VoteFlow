import { ITransactionService } from "../../app/providers/ITransactionService";
import { IOptionRepo } from "../../app/repositories/IOptionRepo";
import { IOptionResultRepo } from "../../app/repositories/IOptionResultRepo";
import { IPollRepo } from "../../app/repositories/IPollRepo";
import { sequelize } from "../databases/dbConnection";

export class TransactionService implements ITransactionService {
  constructor(
    private pollRepo: IPollRepo,
    private optionRepo: IOptionRepo,
    private optionResultRepo: IOptionResultRepo
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
}
