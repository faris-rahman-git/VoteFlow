import { Socket } from "socket.io";
import { LiveResultType } from "../contracts/socket";

export interface ISocketService {
  joinToVotesRoom(socket: Socket, pollId: number, isSwitch: boolean): void;
  joinToNonVotesRoom(socket: Socket, pollId: number): void;

  EmitUpdatedPoll(pollId: number, fullResults: LiveResultType): void;
}
