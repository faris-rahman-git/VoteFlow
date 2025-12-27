import http from "http";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

import app from "./app";
import { initDatabase } from "./infra/databases/initDatabase";
import { sequelize } from "./infra/databases/dbConnection";

const server = http.createServer(app);

async function start() {
  await initDatabase();
  await sequelize.authenticate();
  await sequelize.sync({ alter: true }); //create/update tables

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
