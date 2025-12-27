import { Transaction } from "sequelize";

export interface IOptionResultRepo {
  initOptionsResult(
    pollId: number,
    optionIds: number[],
    transaction: Transaction
  ): Promise<void>;

  getOptionsResult(pollId: number): Promise<Promise<Record<number, number>>>;

  updateOptionCount(optionId: number, transaction: Transaction): Promise<void>;
}
