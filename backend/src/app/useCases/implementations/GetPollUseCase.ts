import { PollErrors } from "../../../domain/constants/errors";
import { ResponseDTO } from "../../../domain/entity/ResponseDTO";
import { IOptionRepo } from "../../repositories/IOptionRepo";
import { IOptionResultRepo } from "../../repositories/IOptionResultRepo";
import { IPollRepo } from "../../repositories/IPollRepo";
import { IVoteRepo } from "../../repositories/IVoteRepo";
import { IGetPollUseCase } from "../interfaces/IGetPollUseCase";

export class GetPollUseCase implements IGetPollUseCase {
  constructor(
    private pollRepo: IPollRepo,
    private OptionRepo: IOptionRepo,
    private OptionResultRepo: IOptionResultRepo,
    private voteRepo: IVoteRepo
  ) {}

  async execute(pollCode: string, voterId: string): Promise<ResponseDTO> {
    const pollRes = await this.pollRepo.getPoll(pollCode);

    if (!pollRes)
      return {
        statusCode: 404,
        data: { message: PollErrors.INVALID_POLL_LINK },
      };

    const optionsRes = await this.OptionRepo.getOptions(pollRes.id);

    const totalVotes = await this.voteRepo.getTotalVotes(pollRes.id);

    const hasVoted = await this.voteRepo.hasVoted(pollRes.id, voterId);

    const isActive = pollRes.expiresAt > new Date();

    if (hasVoted) {
      const optionResultMap = await this.OptionResultRepo.getOptionsResult(
        pollRes.id
      );

      optionsRes.forEach((option) => {
        option.count = optionResultMap[option.id] ?? 0;
      });
    }

    return {
      statusCode: 200,
      data: {
        isActive,
        hasVoted,
        poll: pollRes,
        options: optionsRes,
        totalVotes,
      },
    };
  }
}
