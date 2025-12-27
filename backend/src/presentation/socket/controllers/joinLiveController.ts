import { Socket } from "socket.io";
import { ISocketController } from "../../../app/providers/controller/ISocketController";
import { IJoinLiveUseCase } from "../../../app/socketUseCase/interfaces/IJoinLiveUseCase";
import { JoinLikeInType } from "../types/LiveTypes";

export class joinLiveController implements ISocketController<JoinLikeInType> {
  constructor(private useCase: IJoinLiveUseCase) {}

  async handle(socket: Socket, data: JoinLikeInType): Promise<void> {
    const { pollId, voterId } = data;
    if (!pollId || !voterId) return;

    await this.useCase.execute(socket, pollId, voterId, data.isSwitch);
    return;
  }
}
