import { IPollRepo } from "../../app/repositories/IPollRepo";
import { Transaction } from "sequelize";
import { Poll } from "../databases/model/Poll";
import { Vote } from "../databases/model/Vote";

export class PollRepo implements IPollRepo {
  constructor() {}

  async createPoll(
    question: string,
    pollCode: string,
    expiresAt: Date,
    transaction: Transaction
  ): Promise<number> {
    const poll = await Poll.create(
      { question, pollCode, expiresAt },
      { transaction }
    );

    return poll.id;
  }

  async checkPollCodeExists(pollCode: string): Promise<boolean> {
    const poll = await Poll.findOne({ where: { pollCode } });
    return !!poll;
  }

  async getPoll(
    pollCode: string
  ): Promise<{ id: number; question: string; expiresAt: Date } | null> {
    const poll = await Poll.findOne({ where: { pollCode } });
    if (!poll) return null;
    return {
      id: poll.id,
      question: poll.question,
      expiresAt: poll.expiresAt,
    };
  }

  async getPollExpireDate(
    pollId: number,
    options?: { transaction?: Transaction }
  ): Promise<Date | null> {
    const poll = await Poll.findOne({
      where: { id: pollId },
      transaction: options?.transaction,
      lock: options?.transaction ? options.transaction.LOCK.UPDATE : undefined,
    });
    return poll ? poll.expiresAt : null;
  }
}
