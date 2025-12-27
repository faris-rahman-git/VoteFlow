import { Transaction } from "sequelize";
import { IOptionRepo } from "../../app/repositories/IOptionRepo";
import { Option } from "../databases/model/Option";

export class OptionRepo implements IOptionRepo {
  constructor() {}

  async createManyOption(
    pollId: number,
    options: string[],
    transaction: Transaction
  ): Promise<number[]> {
    const rows = options.map((text) => ({
      text,
      pollId,
    }));

    const createdOptions = await Option.bulkCreate(rows, { transaction });

    return createdOptions.map((opt) => opt.id);
  }

  async getOptions(pollId: number): Promise<{ id: number; text: string ; count: number }[]> {
    const options = await Option.findAll({ where: { pollId } });
    return options.map((opt) => ({ id: opt.id, text: opt.text , count: 0}));
  }
}
