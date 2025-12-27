import { Transaction } from "sequelize";
import { OptionResult } from "../databases/model/OptionResult";
import { IOptionResultRepo } from "../../app/repositories/IOptionResultRepo";

export class OptionResultRepo implements IOptionResultRepo {
  constructor() {}

  async initOptionsResult(
    pollId: number,
    optionIds: number[],
    transaction: Transaction
  ): Promise<void> {
    const rows = optionIds.map((optionId) => ({
      pollId,
      optionId,
      voteCount: 0,
    }));

    await OptionResult.bulkCreate(rows, { transaction });
  }

  async getOptionsResult(
    pollId: number
  ): Promise<Promise<Record<number, number>>> {
    const results = await OptionResult.findAll({ where: { pollId } });

    const map: Record<number, number> = {};

    results.forEach((r) => {
      map[r.optionId] = r.voteCount;
    });

    return map;
  }

  async updateOptionCount(
    optionId: number,
    transaction: Transaction
  ): Promise<void> {
    await OptionResult.increment(
      { voteCount: 1 },
      { where: { id: optionId }, transaction }
    );
  }
}
