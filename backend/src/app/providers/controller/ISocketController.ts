import { Socket } from "socket.io";

export interface ISocketController<TData = unknown> {
  handle(socket: Socket, data: TData): Promise<void>;
}
