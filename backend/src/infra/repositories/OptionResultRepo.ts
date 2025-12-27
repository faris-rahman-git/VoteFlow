import { Transaction } from "sequelize";
import { OptionResult } from "../databases/model/OptionResult";
import { IOptionResultRepo } from "../../app/repositories/IOptionResultRepo";

export class OptionResultRepo implements IOptionResultRepo {
      constructor() {}

  async initOptionsResult(
    optionIds: number[],
    transaction: Transaction
  ): Promise<void> {
    const rows = optionIds.map((optionId) => ({
      optionId,
      voteCount: 0,
    }));

    await OptionResult.bulkCreate(rows, { transaction });
  }
}
