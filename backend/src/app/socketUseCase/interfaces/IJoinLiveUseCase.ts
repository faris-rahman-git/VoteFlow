import { Socket } from "socket.io";

export interface IJoinLiveUseCase {
  execute(
    socket: Socket,
    pollId: number,
    voterId: string,
    isSwitch: boolean
  ): Promise<void>;
}
