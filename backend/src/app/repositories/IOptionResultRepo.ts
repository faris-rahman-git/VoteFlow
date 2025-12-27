import { Transaction } from "sequelize";

export interface IOptionResultRepo {
  initOptionsResult(
    optionIds: number[],
    transaction: Transaction
  ): Promise<void>;
}
