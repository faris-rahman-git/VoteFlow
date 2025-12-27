import { ISocketController } from "../../app/providers/controller/ISocketController";
import { Socket } from "socket.io";

export function socketAdapter(controller: ISocketController, socket: Socket) {
  return async (data: any) => {
    try {
      await controller.handle(socket, data);
    } catch (err) {
      console.error("Socket controller error:", err);
      // emit error to client
      socket.emit("result-error", {
        message: "Socket error! Please try Reloading the page.",
      });
    }
  };
}
