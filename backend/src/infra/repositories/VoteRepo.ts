import { IVoteRepo } from "../../app/repositories/IVoteRepo";
import { Vote } from "../databases/model/Vote";

export class VoteRepo implements IVoteRepo {
  constructor() {}

  async getTotalVotes(pollId: number): Promise<number> {
    const totalVotes = await Vote.count({ where: { pollId } });
    return totalVotes;
  }

  async hasVoted(pollId: number, voterId: string): Promise<number | null> {
    const vote = await Vote.findOne({ where: { pollId, voterId } });
    return vote?.optionId ?? null;
  }
}
