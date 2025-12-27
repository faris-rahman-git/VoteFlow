import { Socket } from "socket.io";
import { IVoteRepo } from "../../repositories/IVoteRepo";
import { IJoinLiveUseCase } from "../interfaces/IJoinLiveUseCase";
import { ISocketService } from "../../providers/ISocketService";

export class JoinLiveUseCase implements IJoinLiveUseCase {
  constructor(
    private voteRepo: IVoteRepo,
    private socketService: ISocketService
  ) {}

  async execute(
    socket: Socket,
    pollId: number,
    voterId: string,
    isSwitch: boolean
  ): Promise<void> {
    const hasVoted = await this.voteRepo.hasVoted(pollId, voterId);
    if (hasVoted) {
      this.socketService.joinToVotesRoom(socket, pollId, isSwitch);
    } else {
      this.socketService.joinToNonVotesRoom(socket, pollId);
    }
    return;
  }
}
