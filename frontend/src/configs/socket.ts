import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL;

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

// Log connection events
socket.on("connect", () => {
  console.log("Connected to socket server:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected from socket server:", reason);
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

export default socket;
