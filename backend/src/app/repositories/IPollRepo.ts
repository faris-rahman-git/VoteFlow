import { Transaction } from "sequelize";

export interface IPollRepo {
  createPoll(
    question: string,
    pollCode: string,
    expiresAt: Date,
    transaction: Transaction
  ): Promise<number>;

  checkPollCodeExists(pollCode: string): Promise<boolean>;
}
