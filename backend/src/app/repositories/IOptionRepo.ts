import { Transaction } from "sequelize";

export interface IOptionRepo {
  createManyOption(
    pollId: number,
    options: string[],
    transaction: Transaction
  ): Promise<number[]>;
}
