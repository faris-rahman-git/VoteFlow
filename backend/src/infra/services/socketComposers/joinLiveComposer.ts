import { ISocketController } from "../../../app/providers/controller/ISocketController";
import { JoinLiveUseCase } from "../../../app/socketUseCase/implementations/JoinLiveUseCase";
import { joinLiveController } from "../../../presentation/socket/controllers/joinLiveController";
import { SocketService } from "../../providers/SocketService";
import { VoteRepo } from "../../repositories/VoteRepo";

export function joinLiveComposer(): ISocketController {
  const useCase = new JoinLiveUseCase(new VoteRepo(), new SocketService());
  return new joinLiveController(useCase);
}
