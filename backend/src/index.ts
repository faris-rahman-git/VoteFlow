import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
const PORT = process.env.PORT || 3000;

import app from "./app";
import { initDatabase } from "./infra/databases/initDatabase";
import { sequelize } from "./infra/databases/dbConnection";
import { setupSocket } from "./presentation/socket";

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
  pingInterval: 3000, // send ping every 5 seconds
  pingTimeout: 2000, // disconnect if no pong within 3s
});

async function start() {
  await initDatabase();
  await sequelize.authenticate();
  await sequelize.sync();
  setupSocket(io);

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
