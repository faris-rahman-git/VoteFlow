import { io } from "../..";
import { LiveResultType } from "../../app/contracts/socket";
import { ISocketService } from "../../app/providers/ISocketService";
import { Socket } from "socket.io";
const UNVOTED_ROOM = "poll_unvoted_";
const VOTED_ROOM = "poll_voted_";

export class SocketService implements ISocketService {
  constructor() {}

  private leaveNonVotesRoom(socket: Socket, pollId: number) {
    socket.leave(UNVOTED_ROOM + pollId);
  }

  joinToVotesRoom(socket: Socket, pollId: number, isSwitch: boolean): void {
    if (isSwitch) {
      console.log("join to votes room");
      this.leaveNonVotesRoom(socket, pollId);
    }
    socket.join(VOTED_ROOM + pollId);
  }

  joinToNonVotesRoom(socket: Socket, pollId: number): void {
    socket.join(UNVOTED_ROOM + pollId);
  }

  EmitUpdatedPoll(pollId: number, fullResults: LiveResultType): void {
    io.to(VOTED_ROOM + pollId).emit("poll_results", fullResults);
    io.to(UNVOTED_ROOM + pollId).emit("poll_results", {
      totalVotes: fullResults.totalVotes,
    });
  }
}
