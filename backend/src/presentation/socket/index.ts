import { Server } from "socket.io";
import { liveResultHandler } from "./handlers/liveResultHandler";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    liveResultHandler(socket);

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
}
