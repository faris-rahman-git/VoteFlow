import { Transaction } from "sequelize";

export interface IVoteRepo {
  getTotalVotes(pollId: number): Promise<number>;

  hasVoted(
    pollId: number,
    voterId: string,
    options?: { transaction?: Transaction }
  ): Promise<number | null>;

  createVote(
    pollId: number,
    optionId: number,
    voterId: string,
    transaction: Transaction
  ): Promise<void>;
}
