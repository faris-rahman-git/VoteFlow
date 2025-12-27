import { Transaction } from "sequelize";

export interface IOptionRepo {
  createManyOption(
    pollId: number,
    options: string[],
    transaction: Transaction
  ): Promise<number[]>;

  getOptions(
    pollId: number
  ): Promise<{ id: number; text: string; count: number }[]>;
}
