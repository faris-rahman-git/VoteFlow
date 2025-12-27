import { IPollServices } from "../../app/providers/IPollServices";
import { IPollRepo } from "../../app/repositories/IPollRepo";

export class PollServices implements IPollServices {
  constructor(private pollRepo: IPollRepo) {}

  private generateCode(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    function randomBlock(length: number) {
      let block = "";
      for (let i = 0; i < length; i++) {
        block += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return block;
    }

    return `${randomBlock(4)}-${randomBlock(4)}-${randomBlock(4)}`;
  }

  async generatePollCode(): Promise<string> {
    let pollCode = this.generateCode();
    while (true) {
      const isExists = await this.pollRepo.checkPollCodeExists(pollCode); // check if pollId already exists in database
      if (!isExists) {
        return pollCode;
      }
      pollCode = this.generateCode();
    }
  }

}
