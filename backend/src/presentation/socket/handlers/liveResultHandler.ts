import { Socket } from "socket.io";
import { socketAdapter } from "../../adapters/socketAdapter";
import { joinLiveComposer } from "../../../infra/services/socketComposers/joinLiveComposer";

export const liveResultHandler = (socket: Socket) => {
  socket.on("join_live", socketAdapter(joinLiveComposer(), socket));
};
